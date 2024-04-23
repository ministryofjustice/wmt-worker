const logger = require('../log')

const mapWorkload = require('../probation-rules').mapWorkload
const Task = require('../domain/task')
const taskType = require('../../constants/task-type')
const taskStatus = require('../../constants/task-status')
const submittingAgent = require('../../constants/task-submitting-agent')
const parseStagingWorkload = require('../parse-staging-workload')
const insertWorkloadOwnerAndDependencies = require('../insert-workload-owner-and-dependencies')
const insertWorkload = require('../data/insert-app-workload')
const createNewTasks = require('../data/create-tasks')
const { arrayToPromise } = require('../helpers/promise-helper')

module.exports.execute = async function (task) {
  const workloadBatchSize = task.additionalData.batchSize
  const startingStagingId = task.additionalData.startingId
  const endingStagingId = startingStagingId + (workloadBatchSize - 1)
  const workloadReportId = task.workloadReportId

  return parseStagingWorkload([startingStagingId, endingStagingId]).then(function (stagingWorkloads) {
    logger.info('reached 1st line - create-workload')
    return arrayToPromise(stagingWorkloads, function (stagingWorkload) {
      logger.info('reached array-to-promise - create-workload')
      const caseSummary = stagingWorkload.casesSummary
      if (caseSummary.omKey !== null) {
        logger.info('case summary om_key not null - create-workload')
        return insertWorkloadOwnerAndDependencies(caseSummary)
          .then(function (workloadOwnerId) {
            logger.info('insert workload setup - create-workload')
            const workloadToInsert = mapWorkload(stagingWorkload, parseInt(workloadOwnerId), parseInt(workloadReportId))
            const caseDetails = stagingWorkload.caseDetails
            logger.info('about to insert workload - create-workload')
            return insertWorkload(workloadToInsert, caseDetails)
          })
      }
      return Promise.resolve()
    })
      .then(function () {
        const processAdjustments = new Task(
          undefined,
          submittingAgent.WORKER,
          taskType.PROCESS_ADJUSTMENTS,
          task.additionalData,
          workloadReportId,
          undefined,
          undefined,
          taskStatus.AWAITING_DUPLICATE_CHECK
        )
        return createNewTasks([processAdjustments])
          .then(function () {
            logger.info('Process adjustments task created')
          })
      })
  })
}

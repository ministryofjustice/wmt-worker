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
    return arrayToPromise(stagingWorkloads, function (stagingWorkload) {
      const caseSummary = stagingWorkload.casesSummary
      if (caseSummary.omKey !== null) {
        return insertWorkloadOwnerAndDependencies(caseSummary)
          .then(function (workloadOwnerId) {
            const workloadToInsert = mapWorkload(stagingWorkload, parseInt(workloadOwnerId), parseInt(workloadReportId))
            const caseDetails = stagingWorkload.caseDetails
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

const logger = require('../log')

const mapWorkload = require('../probation-rules').mapWorkload
const Task = require('../domain/task')
const taskType = require('../../constants/task-type')
const taskStatus = require('../../constants/task-status')
const submittingAgent = require('../../constants/task-submitting-agent')
const parseStagingOmicWorkload = require('../parse-staging-omic-workload')
const insertWorkloadOwnerAndDependencies = require('../insert-workload-owner-and-dependencies')
const insertOmicWorkload = require('../data/insert-app-omic-workload')
const createNewTasks = require('../data/create-tasks')
const operationTypes = require('../../constants/calculation-tasks-operation-type')

module.exports.execute = function (task) {
  const workloadBatchSize = task.additionalData.batchSize
  const startingStagingId = task.additionalData.startingId
  const endingStagingId = startingStagingId + (workloadBatchSize - 1)
  const workloadReportId = task.workloadReportId

  return parseStagingOmicWorkload([startingStagingId, endingStagingId]).then(function (stagingWorkloads) {
    return Promise.all(stagingWorkloads.map(function (stagingWorkload) {
      const caseSummary = stagingWorkload.casesSummary
      if (caseSummary.omKey !== null) {
        return insertWorkloadOwnerAndDependencies(caseSummary)
          .then(function (workloadOwnerId) {
            const workloadToInsert = mapWorkload(stagingWorkload, parseInt(workloadOwnerId), parseInt(workloadReportId))
            const caseDetails = stagingWorkload.caseDetails
            return insertOmicWorkload(workloadToInsert, caseDetails)
          })
      }
      return Promise.resolve()
    }))
      .then(function () {
        const calculateOmicWpAdditionalData = {
          workloadBatch: task.additionalData,
          operationType: operationTypes.INSERT
        }
        const calculateOmicWorkloadPointsTask = new Task(
          undefined,
          submittingAgent.WORKER,
          taskType.CALCULATE_OMIC_WORKLOAD_POINTS,
          calculateOmicWpAdditionalData,
          workloadReportId,
          undefined,
          undefined,
          taskStatus.AWAITING_DUPLICATE_CHECK
        )
        return createNewTasks([calculateOmicWorkloadPointsTask])
          .then(function () {
            logger.info('Calculate OMIC Workload Points Task Created')
          })
      })
  })
}

const Promise = require('bluebird').Promise
const logger = require('../log')

const mapWorkload = require('wmt-probation-rules').mapWorkload
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
  var workloadBatchSize = task.additionalData.batchSize
  var startingStagingId = task.additionalData.startingId
  var endingStagingId = startingStagingId + (workloadBatchSize - 1)
  var workloadReportId = task.workloadReportId

  return parseStagingOmicWorkload([startingStagingId, endingStagingId]).then(function (stagingWorkloads) {
    return Promise.each(stagingWorkloads, function (stagingWorkload) {
      var caseSummary = stagingWorkload.casesSummary
      if (caseSummary.omKey !== null) {
        return insertWorkloadOwnerAndDependencies(caseSummary)
        .then(function (workloadOwnerId) {
          var workloadToInsert = mapWorkload(stagingWorkload, parseInt(workloadOwnerId), parseInt(workloadReportId))
          var caseDetails = stagingWorkload.caseDetails
          return insertOmicWorkload(workloadToInsert, caseDetails)
        })
      }
    })
    .then(function () {
      var calculateOmicWpAdditionalData = {
        workloadBatch: task.additionalData,
        operationType: operationTypes.INSERT
      }
      var calculateOmicWorkloadPointsTask = new Task(
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

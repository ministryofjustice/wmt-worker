const logger = require('../log')
const createNewTasks = require('../data/create-tasks')
const taskType = require('../../constants/task-type')
const taskStatus = require('../../constants/task-status')
const Task = require('../domain/task')
const submittingAgent = require('../../constants/task-submitting-agent')
const getOpenReductionsForCourtReporters = require('../data/get-open-reductions-for-court-reporters')
const updateStatus = require('../update-adjustment-reduction-status')
const operationType = require('../../constants/calculation-tasks-operation-type')

module.exports.execute = function (task) {
  var courtReportStagingIdStart = task.additionalData.startingId
  var courtReportStagingIdEnd = courtReportStagingIdStart + task.additionalData.batchSize - 1
  var workloadReportId = task.workloadReportId

  logger.info('Retrieving open reductions for court reporters with court reports\' staging ids ' + courtReportStagingIdStart + ' - ' + courtReportStagingIdEnd + ', for workload report ' + workloadReportId)
  return getOpenReductionsForCourtReporters(courtReportStagingIdStart, courtReportStagingIdEnd, workloadReportId)
    .then(function (reductions) {
      return updateStatus.updateReductionStatuses(reductions)
      .then(function (result) {
        logger.info('Reduction statuses updated')

        var courtReportsCalculationAdditionalData = {
          workloadBatch: task.additionalData,
          operationType: operationType.INSERT
        }

        var courtReportsCalculation = new Task(
          undefined,
          submittingAgent.WORKER,
          taskType.COURT_REPORTS_CALCULATION,
          courtReportsCalculationAdditionalData,
          task.workloadReportId,
          undefined,
          undefined,
          taskStatus.PENDING
          )

        return createNewTasks([courtReportsCalculation])
        .then(function () {
          logger.info('Court reports calculation task created')
        })
      })
    })
}

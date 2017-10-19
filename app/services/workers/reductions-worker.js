const logger = require('../log')
const createNewTasks = require('../data/create-tasks')
const taskType = require('../../constants/task-type')
const taskStatus = require('../../constants/task-status')
const Task = require('../domain/task')
const submittingAgent = require('../../constants/task-submitting-agent')
const getOpenReductions = require('../data/get-open-reductions')
const statusUpdater = require('../status-updater')

module.exports.execute = function (task) {
  var workloadStagingIdStart = task.additionalData.startingId
  var workloadStagingIdEnd = workloadStagingIdStart + task.additionalData.batchSize - 1
  var workloadReportId = task.workloadReportId

  logger.info('Retrieving open reductions for workload owners with workloads\' staging ids ' + workloadStagingIdStart + ' - ' + workloadStagingIdEnd + ', for workload report ' + workloadReportId)
  return getOpenReductions(workloadStagingIdStart, workloadStagingIdEnd, workloadReportId)
    .then(function (reductions) {
      return statusUpdater.updateReductionStatuses(reductions)
      .then(function (result) {
        logger.info('Reduction statuses updated')

        var processAdjustments = new Task(
          undefined,
          submittingAgent.WORKER,
          taskType.PROCESS_ADJUSTMENTS,
          task.additionalData,
          task.workloadReportId,
          undefined,
          undefined,
          taskStatus.PENDING
          )

        return createNewTasks([processAdjustments])
        .then(function () {
          logger.info('Process adjustments task created')
        })
      })
    })
}

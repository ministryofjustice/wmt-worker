const Promise = require('bluebird')
const config = require('../config')
const log = require('./services/log')
const taskStatus = require('./constants/task-status')
const workloadReportStatus = require('./constants/workload-report-status')
const taskType = require('./constants/task-type')
const getPendingTasksAndMarkInProgress = require('./services/data/get-pending-tasks-and-mark-in-progress')
const updateWorkloadReportStatus = require('./services/data/update-workload-report-with-status')
const countTaskStatuses = require('./services/task-status-counter')
const completeTaskWithStatus = require('./services/data/complete-task-with-status')
const getWorkerForTask = require('./services/get-worker-for-task')
const callWebRefreshEndpoint = require('./services/refresh-web-org-hierarchy')
const closePreviousWorkloadReport = require('./services/close-previous-workload-report')
const updateWorkloadReportEffectiveTo = require('./services/data/update-workload-report-effective-to')
const operationTypes = require('./constants/calculation-tasks-operation-type')
const getTaskInProgressCount = require('./services/data/get-tasks-inprogress-count')

module.exports = function () {
  var batchSize = parseInt(config.ASYNC_WORKER_BATCH_SIZE, 10)
  // Check if in progress count === 0
  return getTaskInProgressCount()
    .then(function (count) {
      if (count[0].theCount === 0) {
        return processTasks(batchSize)
      } else {
        log.info('Too many tasks already IN-PROGRESS')
      }
    })
}

function processTasks (batchSize) {
  return getPendingTasksAndMarkInProgress(batchSize)
    .then(function (tasks) {
      log.info(`found ${tasks.length} tasks`)
      if (tasks.length === 0) { return }

      var promiseArray = []

      for (var task of tasks) {
        var worker = getWorkerForTask(task.type)

        if (worker) {
          promiseArray.push(executeWorkerForTaskType(worker, task))
        } else {
          log.info(`unable to find worker for task: ${task.type}`)
        }
      }

      return Promise.all(promiseArray)
    })
}

function executeWorkerForTaskType (worker, task) {
  log.info(`started task: ${task.id}-${task.type}`)

  return worker.execute(task)
    .then(function () {
      return completeTaskWithStatus(task.id, taskStatus.COMPLETE)
      .then(function () {
        if (task.type === taskType.CALCULATE_WORKLOAD_POINTS && task.additionalData.operationType === operationTypes.INSERT) {
          return countTaskStatuses(task)
          .then(function (totals) {
            if (totals.numPending === 0 && totals.numInProgress === 0 && totals.numFailed === 0) {
              return closePreviousWorkloadReport(task.workloadReportId)
              .then(function (previousWorkloadReportId) {
                return updateWorkloadReportStatus(previousWorkloadReportId, workloadReportStatus.COMPLETE)
                .then((result) => {
                  return callWebRefreshEndpoint()
                })
              })
            }
          })
        } else if (task.type === taskType.CALCULATE_WORKLOAD_POINTS && task.additionalData.operationType === operationTypes.UPDATE) {
          return callWebRefreshEndpoint()
        }
        log.info(`completed task: ${task.id}-${task.type}`)
      })
    }).catch(function (error) {
      log.error(`error running task: ${task.id}-${task.type}, error: ${error}`)
      log.error({error: error})
      if (task.type === taskType.CALCULATE_WORKLOAD_POINTS) {
        updateWorkloadReportStatus(task.workloadReportId, workloadReportStatus.FAILED)
        updateWorkloadReportEffectiveTo(task.workloadReportId, new Date())
      }
      return completeTaskWithStatus(task.id, taskStatus.FAILED)
    })
}

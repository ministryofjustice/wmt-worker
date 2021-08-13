const Promise = require('bluebird')
const config = require('../config')
const log = require('./services/log')
const taskStatus = require('./constants/task-status')
const workloadReportStatus = require('./constants/workload-report-status')
const taskType = require('./constants/task-type')
const triggerableTasks = require('./constants/triggerable-tasks')
const getPendingTasksAndMarkInProgress = require('./services/data/get-pending-tasks-and-mark-in-progress')
const updateWorkloadReportStatus = require('./services/data/update-workload-report-with-status')
const countTaskStatuses = require('./services/task-status-counter')
const completeTaskWithStatus = require('./services/data/complete-task-with-status')
const getWorkerForTask = require('./services/get-worker-for-task')
const closePreviousWorkloadReport = require('./services/close-previous-workload-report')
const updateWorkloadReportEffectiveTo = require('./services/data/update-workload-report-effective-to')
const operationTypes = require('./constants/calculation-tasks-operation-type')
const getTaskInProgressCount = require('./services/data/get-tasks-inprogress-count')
const checkForDuplicateTasks = require('./services/data/check-for-duplicate-tasks')
const setTasksToPending = require('./services/data/set-tasks-to-pending')
const deleteDuplicateTask = require('./services/data/delete-duplicate-task')
const checkAllTasksForTypeAreComplete = require('./services/data/check-all-tasks-for-type-are-complete')
const checkWorkloadIsComplete = require('./services/data/check-tasks-are-complete-for-workload')
const Task = require('./services/domain/task')
const createNewTasks = require('./services/data/create-tasks')
const submittingAgent = require('./constants/task-submitting-agent')

module.exports = function () {
  const batchSize = parseInt(config.ASYNC_WORKER_BATCH_SIZE, 10)
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
      if (tasks.length === 0) { return }
      log.info(`found ${tasks.length} tasks`)

      const promiseArray = []

      for (const task of tasks) {
        const worker = getWorkerForTask(task.type)

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
                  const removeDuplicatesTask = new Task(
                    undefined,
                    submittingAgent.WORKER,
                    taskType.REMOVE_DUPLICATES,
                    undefined,
                    task.workloadReportId,
                    undefined,
                    undefined,
                    taskStatus.PENDING
                  )
                  return createNewTasks([removeDuplicatesTask])
                }
              })
          } else if (Object.keys(triggerableTasks).includes(task.type)) {
            const deleteTasks = []
            return checkAllTasksForTypeAreComplete(task.type, task.workloadReportId)
              .then(function (result) {
                if (result) {
                  // check for any duplicate tasks and remove if necessary
                  checkForDuplicateTasks(triggerableTasks[task.type], task.workloadReportId)
                    .then(function (duplicatesResults) {
                      if (duplicatesResults.length > 0) {
                        duplicatesResults.forEach(function (result) {
                          deleteTasks.push(deleteDuplicateTask(result.additionalData, triggerableTasks[task.type], task.workloadReportId, result.theCount))
                        })
                        Promise.all(deleteTasks).then(function () {
                          return setTasksToPending(triggerableTasks[task.type], task.workloadReportId)
                        })
                      } else {
                        return setTasksToPending(triggerableTasks[task.type], task.workloadReportId)
                      }
                    })
                  // Set Mapped tasks to pending
                }
              })
          }
          log.info(`completed task: ${task.id}-${task.type}`)
          return checkWorkloadIsComplete(task.workloadReportId).then(function (result) {
            if (result) {
              return closePreviousWorkloadReport(task.workloadReportId)
                .then(function (previousWorkloadReportId) {
                  return updateWorkloadReportStatus(previousWorkloadReportId, workloadReportStatus.COMPLETE)
                })
            }
          })
        })
    }).catch(function (error) {
      log.jobError(`${task.id}-${task.type}`, error)
      if (task.submitting_agent === 'WORKER') {
        updateWorkloadReportStatus(task.workloadReportId, workloadReportStatus.FAILED)
        updateWorkloadReportEffectiveTo(task.workloadReportId, new Date())
      }
      return completeTaskWithStatus(task.id, taskStatus.FAILED)
    })
}

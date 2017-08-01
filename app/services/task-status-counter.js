const getTasks = require('./data/get-tasks')
const taskStatus = require('../constants/task-status')

module.exports = function (currentTask) {
  return getTasks(currentTask.workloadReportId, currentTask.type)
  .then(function (taskList) {
    var numPending = 0
    var numInProgress = 0
    var numFailed = 0

    for (var taskId in taskList) {
      switch (taskList[taskId].status) {
        case taskStatus.PENDING:
          numPending++
          break
        case taskStatus.INPROGRESS:
          numInProgress++
          break
        case taskStatus.FAILED:
          numFailed++
          break
      }
    }

    return {
      numPending: numPending,
      numInProgress: numInProgress,
      numFailed: numFailed
    }
  })
}

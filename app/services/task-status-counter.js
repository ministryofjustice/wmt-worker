const getTasks = require('./data/get-tasks')
const taskStatus = require('../constants/task-status')

module.exports = function (currentTask) {
  return getTasks(currentTask.workloadReportId, currentTask.type)
    .then(function (taskList) {
      let numPending = 0
      let numInProgress = 0
      let numFailed = 0
      let numCompleted = 0

      for (const taskId in taskList) {
        switch (taskList[taskId].status) {
          case taskStatus.PENDING:
            numPending++
            break
          case taskStatus.COMPLETE:
            numCompleted++
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
        numFailed: numFailed,
        numCompleted: numCompleted
      }
    })
}

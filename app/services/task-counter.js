const getAllTasks = require('./data/get-all-tasks')
const taskStatus = require('../constants/task-status')
const markCurrentWorkloadAsComplete = require('./data/update-current-workload-report-with-status')

module.exports = function (currentTask) {
  console.log(currentTask)
  var taskList = getAllTasks()
  var numPending = taskList.filter(statusFilter('P')).length
  if (numPending === 0) {
    var numFailed = taskList.filter(statusFilter('F')).length
    if (numFailed === 0) {
      var numInProgress = taskList.filter(statusFilter('I')).length
      if (numInProgress === 0) {
        markCurrentWorkloadAsComplete(currentTask.id, taskStatus.COMPLETE)
      }
    }
  }
}

var statusFilter = function (startingLetter) {
  return function (element) {
    return element.status.startsWith(startingLetter)
  }
}

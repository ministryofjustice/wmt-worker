const getTasks = require('./data/get-tasks')
const taskStatus = require('../constants/task-status')
const updateWorkloadReportStatus = require('./data/update-current-workload-report-with-status')
const callWebRefreshEndpoint = require('./refresh-web-org-hierarchy')

module.exports = function (currentTask) {
  console.log(currentTask)
  var taskList = getTasks(currentTask.workloadReportId, currentTask.type)

  var numPending = 0
  var numInProgress = 0
  var numFailed = 0

  for (var task in taskList) {
    switch (task.status) {
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

  if (numPending === 0 && numInProgress === 0 && numFailed === 0) {
    updateWorkloadReportStatus(currentTask.id, taskStatus.COMPLETE)
    .then((result) => {
      callWebRefreshEndpoint()
    })
  }
}

  // var numPending = taskList.filter(element.status.equals(taskStatus.PENDING)).length

  // if (numPending === 0) {
  //   var numFailed = taskList.filter(statusFilter('F')).length

  //   if (numFailed === 0) {
  //     var numInProgress = taskList.filter(statusFilter('I')).length

  //     if (numInProgress === 0) {
  //       updateWorkloadReportStatus(currentTask.id, taskStatus.COMPLETE)
  //         .then((result) => {
  //           callWebRefreshEndpoint()
  //         })
  //     }
  //   }
  // }

// var statusFilter = function (startingLetter) {
//   return function (element) {
//     return element.status.startsWith(startingLetter)
//   }
// }

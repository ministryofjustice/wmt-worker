const getTasks = require('./data/get-tasks')
const taskStatus = require('../constants/task-status')
const updateWorkloadReportStatus = require('./data/update-workload-report-with-status')
const callWebRefreshEndpoint = require('./refresh-web-org-hierarchy')

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

    if (numPending === 0 && numInProgress === 0 && numFailed === 0) {
      updateWorkloadReportStatus(currentTask.id, taskStatus.COMPLETE)
      .then((result) => {
        callWebRefreshEndpoint()
      })
    }
  })
}

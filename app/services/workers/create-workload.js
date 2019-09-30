const Promise = require('bluebird').Promise
const logger = require('../log')

const mapWorkload = require('wmt-probation-rules').mapWorkload
const Task = require('../domain/task')
const taskType = require('../../constants/task-type')
const taskStatus = require('../../constants/task-status')
const submittingAgent = require('../../constants/task-submitting-agent')
const parseStagingWorkload = require('../parse-staging-workload')
const insertWorkloadOwnerAndDependencies = require('../insert-workload-owner-and-dependencies')
const insertWorkload = require('../data/insert-app-workload')
const createNewTasks = require('../data/create-tasks')

module.exports.execute = function (task) {
  var workloadBatchSize = task.additionalData.batchSize
  var startingStagingId = task.additionalData.startingId
  var endingStagingId = startingStagingId + (workloadBatchSize - 1)
  var workloadReportId = task.workloadReportId

  return parseStagingWorkload([startingStagingId, endingStagingId]).then(function (stagingWorkloads) {
    return Promise.each(stagingWorkloads, function (stagingWorkload) {
      var caseSummary = stagingWorkload.casesSummary
      if (caseSummary.omKey !== null) {
        return insertWorkloadOwnerAndDependencies(caseSummary)
        .then(function (workloadOwnerId) {
          var workloadToInsert = mapWorkload(stagingWorkload, parseInt(workloadOwnerId), parseInt(workloadReportId))
          var caseDetails = stagingWorkload.caseDetails
          return insertWorkload(workloadToInsert, caseDetails)
        })
      }
    })
    .then(function () {
      var reductionsWorkerTask = new Task(
                undefined,
                submittingAgent.WORKER,
                taskType.PROCESS_REDUCTIONS,
                task.additionalData,
                workloadReportId,
                undefined,
                undefined,
                taskStatus.PENDING
                )
      return createNewTasks([reductionsWorkerTask])
      .then(function () {
        logger.info('Reduction Worker Task created')
      })
    })
  })
}

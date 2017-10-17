const Promise = require('bluebird').Promise
const logger = require('../log')

const mapWorkload = require('wmt-probation-rules').mapWorkload
const Task = require('../domain/task')
const taskType = require('../../constants/task-type')
const taskStatus = require('../../constants/task-status')
const submittingAgent = require('../../constants/task-submitting-agent')
const getStagingWorkload = require('../data/get-staging-workload')
const insertWorkloadOwnerAndDependencies = require('../insert-workload-owner-and-dependencies')
const insertWorkload = require('../data/insert-app-workload')
const createNewTasks = require('../data/create-tasks')

module.exports.execute = function (task) {
  var workloadBatchSize = task.additionalData.batchSize
  var startingStagingId = task.additionalData.startingId
  var endingStagingId = startingStagingId + (workloadBatchSize - 1)
  var workloadReportId = task.workloadReportId

  return getStagingWorkload([startingStagingId, endingStagingId]).then(function (stagingWorkloads) {
    var insertedWorkloadIds = []
    return Promise.each(stagingWorkloads, function (stagingWorkload) {
      var caseSummary = stagingWorkload.casesSummary
      return insertWorkloadOwnerAndDependencies(caseSummary)
      .then(function (workloadOwnerId) {
        var workloadToInsert = mapWorkload(stagingWorkload, parseInt(workloadOwnerId), parseInt(workloadReportId))
        return insertWorkload(workloadToInsert)
        .then(function (workloadId) {
          insertedWorkloadIds.push(workloadId)
        })
      })
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

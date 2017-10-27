const logger = require('../log')
const Promise = require('bluebird').Promise

const Task = require('../domain/task')
const taskType = require('../../constants/task-type')
const taskStatus = require('../../constants/task-status')
const submittingAgent = require('../../constants/task-submitting-agent')
const mapCourtReports = require('wmt-probation-rules').mapCourtReports
const getStgCourtReporters = require('../data/get-staging-court-reporters')
const insertWorkloadOwnerAndDependencies = require('../insert-workload-owner-and-dependencies')
const insertCourtReports = require('../data/insert-app-court-reports')
const createNewTasks = require('../data/create-tasks')

module.exports.execute = function (task) {
  var batchSize = task.additionalData.batchSize
  var startingStagingId = task.additionalData.startingId
  var endingStagingId = startingStagingId + (batchSize - 1)
  var workloadReportId = task.workloadReportId

  return getStgCourtReporters([startingStagingId, endingStagingId])
  .then(function (stagingCourtReports) {
    return Promise.each(stagingCourtReports, function (stagingCourtReport) {
      var caseSummary = stagingCourtReport.casesSummary
      return insertWorkloadOwnerAndDependencies(caseSummary)
      .then(function (workloadOwnerId) {
        var courtReportToInsert = mapCourtReports(stagingCourtReport, parseInt(workloadOwnerId), parseInt(workloadReportId))
        return insertCourtReports(courtReportToInsert)
        .then(function (insertedId) {
          logger.info('Court Report with id ' + insertedId + ' added')
        })
      })
    })
    .then(function () {
      var reductionsWorkerTask = new Task(
                undefined,
                submittingAgent.WORKER,
                taskType.PROCESS_REDUCTIONS_COURT_REPORTERS,
                task.additionalData,
                workloadReportId,
                undefined,
                undefined,
                taskStatus.PENDING
                )
      return createNewTasks([reductionsWorkerTask])
      .then(function () {
        logger.info('Court Reporters Reduction Worker Task created')
      })
    })
  })
}

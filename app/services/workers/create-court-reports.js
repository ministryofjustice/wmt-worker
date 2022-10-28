const logger = require('../log')

const Task = require('../domain/task')
const taskType = require('../../constants/task-type')
const taskStatus = require('../../constants/task-status')
const submittingAgent = require('../../constants/task-submitting-agent')
const mapCourtReports = require('../probation-rules').mapCourtReports
const getStgCourtReporters = require('../data/get-staging-court-reporters')
const insertWorkloadOwnerAndDependencies = require('../insert-workload-owner-and-dependencies')
const insertCourtReports = require('../data/insert-app-court-reports')
const createNewTasks = require('../data/create-tasks')
const { arrayToPromise } = require('../helpers/promise-helper')
const operationType = require('../../constants/calculation-tasks-operation-type')

module.exports.execute = async function (task) {
  const batchSize = task.additionalData.batchSize
  const startingStagingId = task.additionalData.startingId
  const endingStagingId = startingStagingId + (batchSize - 1)
  const workloadReportId = task.workloadReportId

  return getStgCourtReporters([startingStagingId, endingStagingId])
    .then(function (stagingCourtReports) {
      return arrayToPromise(stagingCourtReports, function (stagingCourtReport) {
        const caseSummary = stagingCourtReport.casesSummary
        if (caseSummary.omKey !== null) {
          return insertWorkloadOwnerAndDependencies(caseSummary)
            .then(function (workloadOwnerId) {
              const courtReportToInsert = mapCourtReports(stagingCourtReport, parseInt(workloadOwnerId), parseInt(workloadReportId))
              return insertCourtReports(courtReportToInsert)
                .then(function (insertedId) {
                  logger.info('Court Report with id ' + insertedId + ' added')
                  return insertedId
                })
            })
        }
        return Promise.resolve()
      })
        .then(function () {
          const courtReportsCalculationAdditionalData = {
            workloadBatch: task.additionalData,
            operationType: operationType.INSERT
          }
          const courtReportsCalculationTask = new Task(
            undefined,
            submittingAgent.WORKER,
            taskType.COURT_REPORTS_CALCULATION,
            courtReportsCalculationAdditionalData,
            workloadReportId,
            undefined,
            undefined,
            taskStatus.AWAITING_DUPLICATE_CHECK
          )
          return createNewTasks([courtReportsCalculationTask])
            .then(function () {
              logger.info('Court Reporters Reduction Worker Task created')
            })
        })
    })
}

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
      logger.info('reached 1st line - create-court-reports')
      return arrayToPromise(stagingCourtReports, function (stagingCourtReport) {
        logger.info('reached array-to-promise - create-court-reports')
        const caseSummary = stagingCourtReport.casesSummary
        if (caseSummary.omKey !== null) {
          logger.info('case summary om_key not null - create-court-reports')
          return insertWorkloadOwnerAndDependencies(caseSummary)
            .then(function (workloadOwnerId) {
              const courtReportToInsert = mapCourtReports(stagingCourtReport, parseInt(workloadOwnerId), parseInt(workloadReportId))
              logger.info('insert courtreport setup - create-court-report')
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
              logger.info('Court Reporters calculation Worker Task created')
            })
        })
    })
}

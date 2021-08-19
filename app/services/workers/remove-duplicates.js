const logger = require('../log')
const checkForDuplicateWorkloads = require('../data/check-for-duplicate-workloads')
const checkForDuplicateCourtReports = require('../data/check-for-duplicate-court-reports')
const getDuplicateWorkloadIds = require('../data/get-duplicate-workload-ids')
const getDuplicateCourtReportIds = require('../data/get-duplicate-court-report-ids')
const deleteTiersForWorkloadIds = require('../data/delete-tiers-for-workload-ids')
const deleteCaseDetailsForWorkloadIds = require('../data/delete-case-details-for-workload-ids')
const deleteWorkloadPointsCalculationsForWorkloadIds = require('../data/delete-workload-points-calculations-for-workload-ids')
const deleteWorkloadsForIds = require('../data/delete-workloads-for-ids')
const deleteCourtReportsCalculationsForCourtReportIds = require('../data/delete-court-reports-calculations-for-court-report-ids')
const deleteCourtReportsForIds = require('../data/delete-court-reports-for-ids')
const Task = require('../domain/task')
const createNewTasks = require('../data/create-tasks')
const submittingAgent = require('../../constants/task-submitting-agent')
const taskType = require('../../constants/task-type')
const taskStatus = require('../../constants/task-status')

module.exports.execute = function (task) {
  return checkForDuplicateWorkloads()
    .then(function (duplicateWorkloads) {
      return Promise.all(duplicateWorkloads.map(function (duplicateWorkload) {
        return getDuplicateWorkloadIds(duplicateWorkload.link_id)
          .then(function (workloadIds) {
            let workloadIdsToRemove = []
            if (workloadIds.length > 1) {
              workloadIds.forEach(function (workloadId) {
                workloadIdsToRemove.push(workloadId.workload_id)
              })
              workloadIdsToRemove = workloadIdsToRemove.sort()
              const workloadIdNotRemoved = workloadIdsToRemove[0]
              workloadIdsToRemove = workloadIdsToRemove.slice(1)
              return deleteTiersForWorkloadIds(workloadIdsToRemove).then(function () {
                return deleteCaseDetailsForWorkloadIds(workloadIdsToRemove).then(function () {
                  return deleteWorkloadPointsCalculationsForWorkloadIds(workloadIdsToRemove).then(function () {
                    return deleteWorkloadsForIds(workloadIdsToRemove).then(function () {
                      logger.info('REMOVE-DUPLICATES - Duplicate Workload Removed', 'Duplicate of ' + workloadIdNotRemoved + ' removed.', 'Removed ' + workloadIdsToRemove)
                    })
                  })
                })
              })
            }
          })
      }))
    })
    .then(function () {
      return checkForDuplicateCourtReports()
        .then(function (duplicateCourtReports) {
          return Promise.all(duplicateCourtReports.map(function (duplicateCourtReport) {
            return getDuplicateCourtReportIds(duplicateCourtReport.id)
              .then(function (courtReportIds) {
                let courtReportIdsToRemove = []
                if (courtReportIds.length > 1) {
                  courtReportIds.forEach(function (courtReportId) {
                    courtReportIdsToRemove.push(courtReportId.court_reports_id)
                  })
                  courtReportIdsToRemove = courtReportIdsToRemove.sort()
                  const courtReportIdNotRemoved = courtReportIdsToRemove[0]
                  courtReportIdsToRemove = courtReportIdsToRemove.slice(1)
                  return deleteCourtReportsCalculationsForCourtReportIds(courtReportIdsToRemove).then(function () {
                    return deleteCourtReportsForIds(courtReportIdsToRemove).then(function () {
                      logger.info('REMOVE-DUPLICATES - Duplicate Court Report Removed', 'Duplicate of ' + courtReportIdNotRemoved + ' removed.', 'Removed ' + courtReportIdsToRemove)
                    })
                  })
                }
              })
          }))
        })
    })
    .then(function () {
      logger.info('REMOVE-DUPLICATES - Indexing Enabled')
      const checkForMissingDivisionsTask = new Task(
        undefined,
        submittingAgent.WORKER,
        taskType.CHECK_FOR_MISSING_DIVISIONS,
        undefined,
        task.workloadReportId,
        undefined,
        undefined,
        taskStatus.PENDING
      )
      return createNewTasks([checkForMissingDivisionsTask])
    })
    .catch(function (error) {
      logger.error('REMOVE-DUPLICATES - An error occurred removing duplicates')
      logger.error(error)
      throw (error)
    })
}

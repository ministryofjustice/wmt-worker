var Promise = require('bluebird').Promise
const logger = require('../log')
const getAppCourtReports = require('../data/get-app-court-reports')
const insertCourtReportsCalculations = require('../data/insert-court-reports-calculation')
const updateCourtReportsCalculations = require('../data/update-court-reports-calculation')
const getWorkloadPointsConfiguration = require('../data/get-workload-points-configuration')
const getAppReductions = require('../data/get-app-reduction-hours')
const getContractedHours = require('../data/get-contracted-hours')
const operationTypes = require('../../constants/calculation-tasks-operation-type')

module.exports.execute = function (task) {
  var startingStagingId = task.additionalData.workloadBatch.startingId
  var batchSize = task.additionalData.workloadBatch.batchSize
  var reportId = task.workloadReportId
  var operationType = task.additionalData.operationType
  var maxStagingId = startingStagingId + batchSize - 1
  var message

  if (batchSize <= 0) {
    logger.error('Batchsize must be greater than 0')
    throw (new Error('Batchsize must be greater than 0'))
  } else if (batchSize > 1) {
    message = 'Calculating Workload Points for workloads with staging ids ' + startingStagingId + ' - ' + maxStagingId + ', for workload report ' + reportId
  } else {
    message = 'Calculating Workload Points for workload with staging id ' + startingStagingId + ', for workload report ' + reportId
  }
  logger.info(message)

  return getAppCourtReports(startingStagingId, maxStagingId, reportId)
  .then(function (courtReports) {
    return Promise.each(courtReports, function (courtReport) {
      var workloadOwnerId = courtReport.workloadOwnerId
      var courtReportsId = courtReport.id

      return getWorkloadPointsConfiguration()
      .then(function (pointsConfiguration) {
        return getAppReductions(workloadOwnerId)
        .then(function (reductions) {
          return getContractedHours(workloadOwnerId)
          .then(function (contractedHours) {
            switch (operationType) {
              case operationTypes.INSERT:
                return insertCourtReportsCalculations(
                  {
                    workloadReportId: reportId,
                    workloadPointsId: pointsConfiguration.id,
                    courtReportsId: courtReportsId,
                    contractedHours: contractedHours,
                    reductionHours: reductions
                  }
                )
              case operationTypes.UPDATE:
                return updateCourtReportsCalculations(
                  {
                    workloadReportId: reportId,
                    workloadPointsId: pointsConfiguration.id,
                    courtReportsId: courtReportsId,
                    contractedHours: contractedHours,
                    reductionHours: reductions
                  }
                )
              default:
                throw new Error('Operation type of ' + operationType + ' is not valid. Should be ' + operationTypes.INSERT + ' or ' + operationTypes.UPDATE)
            }
          })
        })
      })
    })
  }).catch(function (error) {
    logger.error('Unable to retrieve court-reports with staging ids ' + startingStagingId + ' - ' + maxStagingId + ', for workload report ' + reportId)
    logger.error(error)
    throw (error)
  })
}

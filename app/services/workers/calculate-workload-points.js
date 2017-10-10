var Promise = require('bluebird').Promise
const logger = require('../log')
const calculateWorkloadPoints = require('wmt-probation-rules').calculateWorkloadPoints
const calculateSdrConversionPoints = require('wmt-probation-rules').calculateSdrConversionPoints
const calculateNominalTarget = require('wmt-probation-rules').calculateNominalTarget
const calculateParomPoints = require('wmt-probation-rules').calculateParomPoints
const calculateAvailablePoints = require('wmt-probation-rules').calculateAvailablePoints
const getAppWorkloads = require('../data/get-app-workloads')
const insertWorkloadPointsCalculations = require('../data/insert-workload-points-calculation')
const updateWorkloadPointsCalculations = require('../data/update-workload-points-calculation')
const getWorkloadPointsConfiguration = require('../data/get-workload-points-configuration')
const getOffenderManagerTypeId = require('../data/get-offender-manager-type-id')
const getAppReductions = require('../data/get-app-reduction-hours')
const getContractedHours = require('../data/get-contracted-hours')
const getAdjustmentPoints = require('../data/get-adjustment-points')
const wpcOperationType = require('../../constants/calculate-workload-points-operation')
const adjustmentCategory = require('../../constants/adjustment-category')

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

  var pointsConfigurationPromise = getWorkloadPointsConfiguration()

  return getAppWorkloads(startingStagingId, maxStagingId, batchSize, reportId).then(function (workloads) {
    return Promise.each(workloads, function (workloadResult) {
      var workload = workloadResult.values
      var workloadId = workloadResult.id
      var getOffenderManagerTypePromise = getOffenderManagerTypeId(workload.workloadOwnerId)
      var getAppReductionsPromise = getAppReductions(workload.workloadOwnerId)
      var getCmsAdjustmentPointsPromise = getAdjustmentPoints(workload.workloadOwnerId, adjustmentCategory.CMS)
      var getGsAdjustmentPointsPromise = getAdjustmentPoints(workload.workloadOwnerId, adjustmentCategory.GS)
      var getContractedHoursPromise = getContractedHours(workload.workloadOwnerId)

      return pointsConfigurationPromise.then(function (pointsConfiguration) {
        var caseTypeWeightings = pointsConfiguration.values
        var sdrConversionPoints = calculateSdrConversionPoints(workload.sdrConversionsLast30Days, caseTypeWeightings.pointsConfiguration.sdrConversion)
        var sdrPoints = calculateSdrConversionPoints(workload.monthlySdrs, caseTypeWeightings.pointsConfiguration.sdr)
        var paromsPoints = calculateParomPoints(workload.paromsCompletedLast30Days, caseTypeWeightings.pointsConfiguration.parom, caseTypeWeightings.pointsConfiguration.paromsEnabled)
        var workloadPoints = calculateWorkloadPoints(workload, caseTypeWeightings)
        return getAppReductionsPromise.then(function (reductions) {
          return getCmsAdjustmentPointsPromise.then(function (cmsAdjustments) {
            return getGsAdjustmentPointsPromise.then(function (gsAdjustments) {
              var totalPoints = (workloadPoints + sdrConversionPoints + sdrPoints + paromsPoints + cmsAdjustments + gsAdjustments)
              return getContractedHoursPromise.then(function (contractedHours) {
                return getOffenderManagerTypePromise.then(function (offenderManagerTypeId) {
                  var nominalTarget = calculateNominalTarget(offenderManagerTypeId, caseTypeWeightings.pointsConfiguration.defaultNominalTargets)
                  var availablePoints = calculateAvailablePoints(nominalTarget, offenderManagerTypeId, contractedHours,
                      reductions, caseTypeWeightings.pointsConfiguration.defaultContractedHours)
                  switch (operationType) {
                    case wpcOperationType.INSERT:
                      return insertWorkloadPointsCalculations(reportId, pointsConfiguration.id, workloadId, totalPoints,
                            sdrPoints, sdrConversionPoints, paromsPoints, nominalTarget, availablePoints, contractedHours, reductions, cmsAdjustments, gsAdjustments)
                    case wpcOperationType.UPDATE:
                      return updateWorkloadPointsCalculations(reportId, pointsConfiguration.id, workloadId, totalPoints,
                            sdrPoints, sdrConversionPoints, paromsPoints, nominalTarget, availablePoints, contractedHours, reductions, cmsAdjustments, gsAdjustments)
                    default:
                      throw new Error('Operation type of ' + operationType + ' is not valid. Should be ' + wpcOperationType.INSERT + ' or ' + wpcOperationType.UPDATE)
                  }
                })
              })
            })
          })
        })
      })
    })
  }).catch(function (error) {
    logger.error('Unable to retrieve workloads with staging ids ' + startingStagingId + ' - ' + maxStagingId + ', for workload report ' + reportId)
    logger.error(error)
    throw (error)
  })
}

var Promise = require('bluebird').Promise
const logger = require('../log')
const calculateWorkloadPoints = require('wmt-probation-rules').calculateWorkloadPoints
const calculateNominalTarget = require('wmt-probation-rules').calculateNominalTarget
const calculateAvailablePoints = require('wmt-probation-rules').calculateAvailablePoints
const getAppWorkloads = require('../data/get-app-workloads')
const insertWorkloadPointsCalculations = require('../data/insert-workload-points-calculation')
const updateWorkloadPointsCalculations = require('../data/update-workload-points-calculation')
const getWorkloadPointsConfiguration = require('../data/get-workload-points-configuration')
const getOffenderManagerTypeId = require('../data/get-offender-manager-type-id')
const getAppReductions = require('../data/get-app-reductions')
const getContractedHours = require('../data/get-contracted-hours')
const getAdjustmentPoints = require('../data/get-adjustment-points')
const wpcOperationType = require('../../constants/calculate-workload-points-operation')
const adjustmentCategory = require('../../constants/adjustment-category')

module.exports.execute = function (task) {
  var id = task.additionalData.workloadBatch.startingId
  var batchSize = task.additionalData.workloadBatch.batchSize
  var reportId = task.workloadReportId
  var operationType = task.additionalData.operationType
  var maxId = id
  var message

  if (batchSize <= 0) {
    logger.error('Batchsize must be greater than 0')
    throw (new Error('Batchsize must be greater than 0'))
  } else if (batchSize > 1) {
    maxId = id + batchSize - 1
    message = 'Calculating Workload Points for Workloads ' + id + ' - ' + (id + batchSize - 1)
  } else {
    message = 'Calculating Workload Points for Workload ' + id
  }
  logger.info(message)

  var pointsConfigurationPromise = getWorkloadPointsConfiguration()

  return getAppWorkloads(id, maxId, batchSize).then(function (workloads) {
    return Promise.each(workloads, function (workloadResult) {
      var workload = workloadResult.values
      var workloadId = workloadResult.id
      var getOffenderManagerTypePromise = getOffenderManagerTypeId(workload.workloadOwnerId)
      var getAppReductionsPromise = getAppReductions(workload.workloadOwnerId)
      var getCmsAdjustmentPointsPromise = getAdjustmentPoints(workload.workloadOwnerId, adjustmentCategory.CMS)
      var getContractedHoursPromise = getContractedHours(workload.workloadOwnerId)

      return pointsConfigurationPromise.then(function (pointsConfiguration) {
        var caseTypeWeightings = pointsConfiguration.values
        var workloadPointsBreakdown = calculateWorkloadPoints(workload, caseTypeWeightings)
        return getAppReductionsPromise.then(function (reductions) {
          return getCmsAdjustmentPointsPromise.then(function (cmsAdjustments) {
            var totalPoints = workloadPointsBreakdown.total + cmsAdjustments
            return getContractedHoursPromise.then(function (contractedHours) {
              return getOffenderManagerTypePromise.then(function (offenderManagerTypeId) {
                var nominalTarget = calculateNominalTarget(offenderManagerTypeId, caseTypeWeightings.pointsConfiguration.defaultNominalTargets)
                var availablePoints = calculateAvailablePoints(nominalTarget, offenderManagerTypeId, contractedHours,
                    reductions, caseTypeWeightings.pointsConfiguration.defaultContractedHours)

                switch (operationType) {
                  case wpcOperationType.INSERT:
                    return insertWorkloadPointsCalculations(
                            reportId,
                            pointsConfiguration.id,
                            workloadId,
                            totalPoints,
                            workloadPointsBreakdown.sdrPoints,
                            workloadPointsBreakdown.sdrConversionPoints,
                            workloadPointsBreakdown.paromsPoints,
                            nominalTarget,
                            availablePoints,
                            reductions,
                            contractedHours,
                            cmsAdjustments)

                  case wpcOperationType.UPDATE:
                    return updateWorkloadPointsCalculations(
                            reportId,
                            pointsConfiguration.id,
                            workloadId,
                            totalPoints,
                            workloadPointsBreakdown.sdrPoints,
                            workloadPointsBreakdown.sdrConversionPoints,
                            workloadPointsBreakdown.paromsPoints,
                            nominalTarget,
                            availablePoints,
                            reductions,
                            contractedHours,
                            cmsAdjustments)
                  default:
                    throw new Error('Operation type of ' + operationType + ' is not valid. Should be ' + wpcOperationType.INSERT + ' or ' + wpcOperationType.UPDATE)
                }
              })
            })
          })
        })
      })
    })
  }).catch(function (error) {
    logger.error('Unable to retrieve workloads with IDs ' + id + ' - ' + (id + batchSize - 1))
    logger.error(error)
    throw (error)
  })
}

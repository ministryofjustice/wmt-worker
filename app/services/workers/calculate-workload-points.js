var Promise = require('bluebird').Promise
const logger = require('../log')
const calculateWorkloadPoints = require('wmt-probation-rules').calculateWorkloadPoints
const calculateSdrConversionPoints = require('wmt-probation-rules').calculateSdrConversionPoints
const calculateNominalTarget = require('wmt-probation-rules').calculateNominalTarget
const calculateParomPoints = require('wmt-probation-rules').calculateParomPoints
const calculateAvailablePoints = require('wmt-probation-rules').calculateAvailablePoints
const getAppWorkloads = require('../data/get-app-workloads')
const insertWorkloadPointsCalculations = require('../data/insert-workload-points-calculation')
const getWorkloadPointsConfiguration = require('../data/get-workload-points-configuration')
const getOffenderManagerTypeId = require('../data/get-offender-manager-type-id')
const getAppReductions = require('../data/get-app-reductions')
const getContractedHours = require('../data/get-contracted-hours')
const getAppCmsReductionHours = require('../data/get-app-cms-reduction-hours')

module.exports.execute = function (task) {
  var id = task.additionalData.workloadBatch.startingId
  var batchSize = task.additionalData.workloadBatch.batchSize
  var reportId = task.workloadReportId

  logger.info('Calculating Workload Points for Workloads ' + id + ' - ' + (id + batchSize))
  var pointsConfigurationPromise = getWorkloadPointsConfiguration()

  return getAppWorkloads(id, batchSize).then(function (workloads) {
    return Promise.each(workloads, function (workloadResult) {
      var workload = workloadResult.values
      var workloadId = workloadResult.id
      var getOffenderManagerTypePromise = getOffenderManagerTypeId(workload.workloadOwnerId)
      var getAppReductionsPromise = getAppReductions(workload.workloadOwnerId)
      var getAppCmsReductionHoursPromise = getAppCmsReductionHours(workload.workloadOwnerId)
      var getContractedHoursPromise = getContractedHours(workload.workloadOwnerId)

      return pointsConfigurationPromise.then(function (pointsConfiguration) {
        var caseTypeWeightings = pointsConfiguration.values
        var sdrConversionPoints = calculateSdrConversionPoints(workload.sdrConversionsLast30Days, caseTypeWeightings.pointsConfiguration.sdrConversion)
        var sdrPoints = calculateSdrConversionPoints(workload.monthlySdrs, caseTypeWeightings.pointsConfiguration.sdr)
        var paromsPoints = calculateParomPoints(workload.paromsCompletedLast30Days, caseTypeWeightings.pointsConfiguration.parom, caseTypeWeightings.pointsConfiguration.paromsEnabled)
        var workloadPoints = calculateWorkloadPoints(workload, caseTypeWeightings)
        var totalPoints = (workloadPoints + sdrConversionPoints + sdrPoints + paromsPoints)
        return getAppReductionsPromise.then(function (reductions) {
          return getAppCmsReductionHoursPromise.then(function (cmsReductions) {
            return getContractedHoursPromise.then(function (contractedHours) {
              return getOffenderManagerTypePromise.then(function (offenderManagerTypeId) {
                var nominalTarget = calculateNominalTarget(offenderManagerTypeId, caseTypeWeightings.pointsConfiguration.defaultNominalTargets)
                var availablePoints = calculateAvailablePoints(nominalTarget, offenderManagerTypeId, contractedHours,
                    reductions, caseTypeWeightings.pointsConfiguration.defaultContractedHours)
                return insertWorkloadPointsCalculations(reportId, pointsConfiguration.id, workloadId, totalPoints,
                    sdrPoints, sdrConversionPoints, paromsPoints, nominalTarget, availablePoints, reductions, contractedHours, cmsReductions)
              })
            })
          })
        })
      })
    })
  }).catch(function (error) {
    logger.error('Unable to retrieve workloads with IDs ' + id + ' - ' + (id + batchSize))
    logger.error(error)
    throw (error)
  })
}

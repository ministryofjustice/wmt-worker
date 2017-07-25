var Promise = require('bluebird').Promise
const logger = require('../log')
const calculateWorkloadPoints = require('wmt-probation-rules').calculateWorkloadPoints
const calculateSdrConversionPoints = require('wmt-probation-rules').calculateSdrConversionPoints
const calculateNominalTarget = require('wmt-probation-rules').calculateNominalTarget
const calculateParomPoints = require('wmt-probation-rules').calculateParomPoints
const calculateAvailablePoints = require('wmt-probation-rules').calculateAvailablePoints
const getAppWorkloads = require('../../services/data/get-app-workloads')
const insertWorkloadPointsCalculations = require('../../services/data/insert-workload-points-calculation')
const getWorkloadPointsConfiguration = require('../../services/data/get-workload-points-configuration')
const getOffenderManagerTypeId = require('../../services/data/get-offender-manager-type-id')
const getAppReductions = require('../../services/data/get-app-reductions')
module.exports.execute = function (task) {
  // TODO hardcoded until we play the reductions story
  var reductions
  var contractedHours = 40

  var id = task.additionalData.workloadBatch.startingId
  var batchSize = task.additionalData.workloadBatch.batchSize
  var reportId = task.workloadReportId

  logger.info('Calculating Workload Points for Workloads ' + id + ' - ' + (id + batchSize))
  var pointsConfgiurationPromise = getWorkloadPointsConfiguration()

  return getAppWorkloads(id, batchSize).then(function (workloads) {
    return Promise.each(workloads, function (workloadResult) {
      var workload = workloadResult.values
      var workloadId = workloadResult.id
      var getOffenderManagerTypePromise = getOffenderManagerTypeId(workload.workloadOwnerId)
      var getAppReductionsPromise = getAppReductions(workload.workloadOwnerId)
      return pointsConfgiurationPromise.then(function (pointsConfiguration) {
        var caseTypeWeightings = pointsConfiguration.values

        var sdrConversionPoints = calculateSdrConversionPoints(workload.sdrConversionsLast30Days, caseTypeWeightings.pointsConfiguration.sdrConversion)
        var sdrPoints = calculateSdrConversionPoints(workload.monthlySdrs, caseTypeWeightings.pointsConfiguration.sdr)
        var paromsPoints = calculateParomPoints(workload.paromsCompletedLast30Days, caseTypeWeightings.pointsConfiguration.parom, caseTypeWeightings.pointsConfiguration.paromsEnabled)
        var workloadPoints = calculateWorkloadPoints(workload, caseTypeWeightings)
        var totalPoints = (workloadPoints + sdrConversionPoints + sdrPoints + paromsPoints)
        return getAppReductionsPromise.then(function (hours) {
          reductions = hours
          return getOffenderManagerTypePromise.then(function (offenderManagerTypeId) {
            var nominalTarget = calculateNominalTarget(offenderManagerTypeId, caseTypeWeightings.pointsConfiguration.defaultNominalTargets)
            var availablePoints = calculateAvailablePoints(nominalTarget, offenderManagerTypeId, contractedHours, reductions, caseTypeWeightings.pointsConfiguration.defaultContractedHours)

            return insertWorkloadPointsCalculations(reportId, pointsConfiguration.id, workloadId, totalPoints,
                  sdrPoints, sdrConversionPoints, paromsPoints, nominalTarget, availablePoints, reductions)
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

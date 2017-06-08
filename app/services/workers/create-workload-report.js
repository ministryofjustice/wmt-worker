const Promise = require('bluebird').Promise
const logger = require('../log')
const calculateTotalWorkloadPoints = require('wmt-probation-rules').calculateTotalWorkloadPoints
const calculateSdrPoints = require('wmt-probation-rules').calculateSdrConversionPoints
const calculateNominalTargetPoints = require('wmt-probation-rules').calculateNominalTargetPoints
const calculateParomsPoints = require('wmt-probation-rules').calculateParomsPoints
const getAppWorkloads = require('../../services/data/get-app-workloads')
const createWorkloadPointsCalcution = require('../../services/data/insert-workload-points-calculation')
const insertWorkloadReport = require('../../services/data/insert-workload-report')
const insertWorkloadPoints = require('../../services/data/insert-workload-points')
const getWorkloadPointsConfiguration = require('../../services/data/get-workload-points-configuration')
const getOffenderManagerId = require('../../services/data/get-offender-manager-id')

module.exports.execute = function (task) {
  logger.info('Executing base workload calculations')
  return Promise.resolve(function (resolve) {
    var id = task.additionalData.workloadId
    var batchSize = task.additionalData.batchSize
    var workload = {}
    var totalWorkloadPoints = 0
    var workloadReportId = 0
    var workloadPointsId = 0
    var sdrPoints = 0
    var nominalTargetPoints = 0
    var paromsPoints = 0
    var caseTypeWeightings = {}

    var appWorkloads = getAppWorkloads(id, batchSize)

    logger.info('Calculating base workload values and storing in the database')
    appWorkloads.array.forEach(function (element) {
      caseTypeWeightings = getWorkloadPointsConfiguration(element.id)
      totalWorkloadPoints = calculateTotalWorkloadPoints(workload, caseTypeWeightings)

      workloadReportId = insertWorkloadReport(workload)
      workloadPointsId = insertWorkloadPoints(workload)
      sdrPoints = calculateSdrPoints(workload.sdrConversionLast30Days, workload.pointsSdrConversion)
      getOffenderManagerId(workload.workloadOwnerId).then(function (offenderManagerTypeId) {
        nominalTargetPoints = calculateNominalTargetPoints(offenderManagerTypeId, caseTypeWeightings.pointsConfiguration.defaultNominalTargets)
        paromsPoints = calculateParomsPoints(workload.numberOfParomCompletedInLast30Days, workload.wpParom, caseTypeWeightings.pointsConfiguration.paromsEnabled)

        createWorkloadPointsCalcution(workloadReportId, workloadPointsId, totalWorkloadPoints, sdrPoints, nominalTargetPoints, paromsPoints)
      })
    }, this)

    resolve()
  })
}

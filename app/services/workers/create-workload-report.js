const Promise = require('bluebird').Promise
const logger = require('../log')
const calculateTotalWorkloadPoints = require('wmt-probation-rules').calculateTotalWorkloadPoints
const getAppWorkloads = require('../../services/data/get-app-workloads')
const createWorkloadPointsCalcution = require('../../services/data/create-workload-points-calculation')
const createWorkloadReport = require('../../services/data/create-workload-report')
const createWorkloadPoints = require('../../services/data/create-workload-points')
const getWorkloadPointsConfiguration = require('../../services/data/get-workload-points-configuration')

module.exports.execute = function (task) {
  logger.info('Executing base workload calculations')
  return Promise.resolve(function (resolve) {
    var id = task.additionalData.workloadId
    var batchSize = task.additionalData.batchSize
    var workload = {}
    var totalWorkloadPoints
    var workloadReportId = 0
    var workloadPointsId = 0
    var caseTypeWeightings = {}

    var appWorkloads = getAppWorkloads(id, batchSize)

    logger.info('Calculating base workload values and storing in the database')
    appWorkloads.array.forEach(function (element) {
      caseTypeWeightings = getWorkloadPointsConfiguration(element.id)
      totalWorkloadPoints = calculateTotalWorkloadPoints(workload, caseTypeWeightings)
      console.log('Do something with :: ' + totalWorkloadPoints)
      workloadReportId = createWorkloadReport(workload)
      workloadPointsId = createWorkloadPoints(workload)
      createWorkloadPointsCalcution(workloadReportId, workloadPointsId, workload)
    }, this)

    resolve()
  })
}

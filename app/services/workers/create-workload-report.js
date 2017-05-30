const Promise = require('bluebird').Promise
const logger = require('../log')
const calculateBaseWorkloadValues = require('wmt-probation-rules').calculateBaseWorkloadValues
const getStagingWorkloads = require('../../services/data/get-staging-workloads')
const createAppWorkload = require('../../services/data/create-app-workload')

module.exports.execute = function (task) {
  logger.info('Executing base workload calculations')
  return Promise.resolve(function (resolve) {
    var id = task.additionalData.workloadId
    var batchSize = task.additionalData.batchSize

    var appWorkloads = []

    var stagingWorkload = getStagingWorkloads(id, batchSize)
    stagingWorkload.array.forEach(function (element) {
      appWorkloads.push(calculateBaseWorkloadValues(stagingWorkload))
    }, this)
    createAppWorkload(appWorkloads)
    resolve()
  })
}

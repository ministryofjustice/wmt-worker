const Promise = require('bluebird').Promise
const logger = require('../log')

module.exports.execute = function (task) {
  logger.info('Executing workload points calculations')
  var results = []
  return Promise.resolve(results)
}

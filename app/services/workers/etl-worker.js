const runETL = require('../../wmt-etl/run-etl')
const log = require('../log')

module.exports.execute = function (task) {
  return runETL()
    .then(function () {
      log.info('Extract process completed')
    }).catch(function (error) {
      throw error
    })
}

const runETL = require('../../wmt-etl/run-etl')

module.exports.execute = function () {
  return runETL()
}

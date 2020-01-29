const logger = require('../log')
const getDivisionsDisplayedCount = require('../data/get-divisions-displayed-count')
const EXPECTED_DIVISION_COUNT = require('../../../config').EXPECTED_DIVISIONS_COUNT

module.exports.execute = function (task) {
  return getDivisionsDisplayedCount()
    .then(function (results) {
      if (results[0].divisionCount !== parseInt(EXPECTED_DIVISION_COUNT)) {
        logger.error('ERROR: Check For Missing Divisions - Missing Divisions Found. Expected ' + EXPECTED_DIVISION_COUNT + ' but found ' + results[0].divisionCount)
      }
    })
}

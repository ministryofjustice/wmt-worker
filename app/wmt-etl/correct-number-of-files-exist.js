const config = require('../../etl-config')

module.exports = function (numberOfFilesFound) {
  return numberOfFilesFound === parseInt(config.EXPECTED_FILE_COUNT)
}

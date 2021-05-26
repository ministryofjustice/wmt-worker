const config = require('../../etl-config')

module.exports = function (numberOfFilesFound) {
  console.log(numberOfFilesFound, config.EXPECTED_FILE_COUNT)
  return numberOfFilesFound === parseInt(config.EXPECTED_FILE_COUNT)
}

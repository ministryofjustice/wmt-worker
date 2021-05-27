const config = require('../../etl-config')
const transformNames = require('./transform-names')

module.exports = function (sheetsInWorkbook) {
  // XLSX file should be in the expected format - i.e. at min contains all valid sheet names
  return config.VALID_SHEET_NAMES.every(sheet => transformNames(sheetsInWorkbook).includes(sheet)) &&
  transformNames(sheetsInWorkbook).every(sheet => config.VALID_SHEET_NAMES.includes(sheet))
}

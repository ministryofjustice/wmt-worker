const cleanName = require('./clean-name')
const config = require('../../etl-config')
const log = require('../services/log')

module.exports = function (ws, sheet, extractFile) {
  ws.forEach((row) => {
    Object.keys(row)
      .forEach((key) => {
        if (cleanName(key) !== key) {
          row[cleanName(key)] = row[key]
          delete row[key]
        }
        if (!config.VALID_COLUMNS[sheet].includes(cleanName(key))) {
          log.info('Removed the following unexpected column: ' + cleanName(key) + ' from the ' + sheet + ' tab in the ' + extractFile + ' file')
          delete row[cleanName(key)]
        }
      })
  })
}

const Promise = require('bluebird').Promise
const cleanName = require('./clean-name')
const config = require('../../etl-config')
const log = require('../services/log')

module.exports = function (ws, sheet, extractFile) {
  const unexpectedColumns = new Set()
  return Promise.each(ws, (row) => {
    const keys = Object.keys(row)
    return Promise.each(keys, (key) => {
      if (cleanName(key) !== key) {
        row[cleanName(key)] = row[key]
        delete row[key]
      }
      if (!config.VALID_COLUMNS[sheet].includes(cleanName(key))) {
        unexpectedColumns.add(cleanName(key))
        delete row[cleanName(key)]
      }
    })
  })
    .then(() => {
      return Promise.each(unexpectedColumns, (unexpectedColumn) => {
        log.info('Removed the following unexpected column: ' + unexpectedColumn + ' from the ' + sheet + ' tab in the ' + extractFile + ' file')
      })
    })
}

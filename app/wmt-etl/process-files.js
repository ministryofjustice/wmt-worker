const Promise = require('bluebird').Promise
const XLSX = require('xlsx')
const config = require('../../etl-config')
const log = require('../services/log')

const sanitiseWorksheetColumns = require('./sanitise-worksheet-columns')
const validateWorkbookFormat = require('./validate-workbook-format')
const insertToStaging = require('./insert-to-staging')
const cleanName = require('./clean-name')

module.exports = function (extractFiles) {
  return Promise.each(extractFiles, function (extractFile) {
    const workbook = XLSX.readFile(extractFile)
    if (!validateWorkbookFormat(Object.keys(workbook.Sheets))) {
      throw new Error('Workbook does not contain the expected worksheets')
    }

    return Promise.each(Object.keys(workbook.Sheets), function (sheet) {
      if (config.VALID_SHEET_NAMES.includes(cleanName(sheet))) {
        const worksheet = workbook.Sheets[sheet]
        const worksheetDataAsJSON = XLSX.utils.sheet_to_json(worksheet)
        return sanitiseWorksheetColumns(worksheetDataAsJSON, cleanName(sheet), extractFile)
          .then(function () {
            return insertToStaging(cleanName(sheet), worksheetDataAsJSON, extractFile)
          })
      }
    })
      .then(function () {
        log.info('Successfully processed file ' + extractFile)
      })
  })
}

const Promise = require('bluebird').Promise
const XLSX = require('xlsx')
const config = require('../../etl-config')
const log = require('../services/log')

const sanitiseWorksheetColumns = require('./sanitise-worksheet-columns')
const validateWorkbookFormat = require('./validate-workbook-format')
const insertToStaging = require('./insert-to-staging')
const cleanName = require('./clean-name')
const { getObject } = require('./get-s3-object')

module.exports = function (extractFiles) {
  return Promise.each(extractFiles, function (extractFile) {
    // GET OBJECT
    // 

    getObject(extractFile.Key).then(function(getObject) {
      const workbook = XLSX.read(getObject, { type: 'array', cellText: false, cellDates: true })
      console.log(`all keys of workbook: ${Object.keys(workbook.Sheets)}`)
      if (!validateWorkbookFormat(Object.keys(workbook.Sheets))) {
        throw new Error('Workbook does not contain the expected worksheets')
      }
  
      return Promise.each(Object.keys(workbook.Sheets), function (sheet) {
        if (config.VALID_SHEET_NAMES.includes(cleanName(sheet))) {
          const worksheet = workbook.Sheets[sheet]
          const worksheetDataAsJSON = XLSX.utils.sheet_to_json(worksheet, { raw: false, defval: null, dateNF: 'yyyy-mm-dd hh:mm:ss' })
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
    
  })
}

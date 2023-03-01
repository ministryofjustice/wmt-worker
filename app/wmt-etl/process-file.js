const XLSX = require('xlsx')
const config = require('../../etl-config')
const log = require('../services/log')

const sanitiseWorksheetColumns = require('./sanitise-worksheet-columns')
const validateWorkbookFormat = require('./validate-workbook-format')
const insertToStaging = require('./insert-to-staging')
const cleanName = require('./clean-name')
const getEtlFile = require('./get-etl-file')
const { arrayToPromise } = require('../services/helpers/promise-helper')

module.exports = function (extractFile) {
  return getEtlFile(extractFile).then(function (getObject) {
    const workbook = XLSX.read(getObject, { type: 'array', cellText: false, cellDates: true })
    log.info(`all keys of workbook: ${Object.keys(workbook.Sheets)}`)
    if (!validateWorkbookFormat(Object.keys(workbook.Sheets))) {
      throw new Error('Workbook does not contain the expected worksheets')
    }
    // validation for T2A case count should be here

    const t2aTotal = getCrnTotal(getParameterCaseInsensitive(workbook.Sheets, 't2a'))
    const caseTotal = getCrnTotal(getParameterCaseInsensitive(workbook.Sheets, 'wmt_extract_filtered'))

    if (t2aTotal >= caseTotal) {
      throw new Error('T2A case count is greater than or equal to case count')
    }
    return arrayToPromise(Object.keys(workbook.Sheets), function (sheet) {
      if (config.VALID_SHEET_NAMES.includes(cleanName(sheet))) {
        const worksheet = workbook.Sheets[sheet]
        const worksheetDataAsJSON = XLSX.utils.sheet_to_json(worksheet, { raw: false, defval: null, dateNF: 'yyyy-mm-dd hh:mm:ss' })
        sanitiseWorksheetColumns(worksheetDataAsJSON, cleanName(sheet), extractFile)
        return insertToStaging(cleanName(sheet), worksheetDataAsJSON, extractFile)
      }
      return Promise.resolve()
    })
      .then(function (ids) {
        log.info(`Successfully processed file ${extractFile}`)
      })
  })
}

function getCrnTotal (worksheet) {
  const worksheetDataAsJSON = XLSX.utils.sheet_to_json(worksheet, { raw: false, defval: null, dateNF: 'yyyy-mm-dd hh:mm:ss' })
  return worksheetDataAsJSON.map((row) => Number(getParameterCaseInsensitive(row, 'v-crn_count'))).reduce((a, b) => a + b, 0)
}

function getParameterCaseInsensitive (object, key) {
  const asLowercase = key.toLowerCase()
  return object[Object.keys(object)
    .find(k => k.toLowerCase() === asLowercase)
  ]
}

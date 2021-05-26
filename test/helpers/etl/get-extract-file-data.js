const glob = require('glob')
const XLSX = require('xlsx')
const config = require('../../../etl-config')
const log = require('../../../app/services/log')

module.exports = function () {
  const extractFiles = glob.sync(config.IMPORT_FILE_DIR + '*.xlsx', {})
  const workbooks = []
  const worksheets = {}
  extractFiles.forEach(function (extractFile) {
    const workbook = XLSX.readFile(extractFile)
    workbooks.push(workbook)
  })

  config.VALID_SHEET_NAMES.forEach(function (sheet) {
    const worksheet1 = workbooks[0].Sheets[sheet]
    const worksheet2 = workbooks[1].Sheets[sheet]
    const worksheet1DataAsJSON = XLSX.utils.sheet_to_json(worksheet1)
    const worksheet2DataAsJSON = XLSX.utils.sheet_to_json(worksheet2)
    worksheets[sheet] = worksheet1DataAsJSON.concat(worksheet2DataAsJSON)
  })
  return worksheets
}

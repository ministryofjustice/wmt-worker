const glob = require('glob')
const XLSX = require('xlsx')
const config = require('../../../etl-config')

module.exports = function () {
  const extractFiles = glob.sync(config.IMPORT_FILE_DIR + '*.xlsx', {})
  const workbooks = []
  const worksheets = {}
  extractFiles.forEach(function (extractFile) {
    const workbook = XLSX.readFile(extractFile, { type: 'binary', cellText: false, cellDates: true })
    workbooks.push(workbook)
  })

  config.VALID_SHEET_NAMES.forEach(function (sheet) {
    const worksheet1 = workbooks[0].Sheets[sheet]
    const worksheet1DataAsJSON = XLSX.utils.sheet_to_json(worksheet1, { raw: false, defval: null, dateNF: 'yyyy-mm-dd hh:mm:ss' })
    worksheets[sheet] = worksheet1DataAsJSON
  })
  return worksheets
}

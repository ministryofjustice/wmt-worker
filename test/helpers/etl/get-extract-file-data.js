const glob = require('glob')
const XLSX = require('xlsx')
const config = require('../../../etl-config')

module.exports = function () {
  const extractFiles = glob.sync('./test/integration/resources/WMT_PS.xlsx', {})
  const workbooks = []
  const worksheets = {}

  extractFiles.forEach(function (extractFile) {
    const workbook = XLSX.readFile(extractFile, { type: 'binary', cellText: false, cellDates: true })
    const lowercaseSheets = Object.entries(workbook.Sheets).reduce(
      function (acc, [key, val]) {
        acc[key.toLowerCase()] = val
        return acc
      }, {})

    workbooks.push(lowercaseSheets)
  })

  config.VALID_SHEET_NAMES.forEach(function (sheet) {
    const worksheet1 = workbooks[0][sheet]
    const worksheet1DataAsJSON = XLSX.utils.sheet_to_json(worksheet1, { raw: false, defval: null, dateNF: 'yyyy-mm-dd hh:mm:ss' })
      .map(entry => Object.entries(entry).reduce(

        function (acc, [key, val]) {
          acc[key.toLowerCase().replace('-', '').replace('\n', '')] = val
          return acc
        }, {}
      ))

    worksheets[sheet] = worksheet1DataAsJSON
  })
  return worksheets
}

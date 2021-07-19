const XlsxPopulate = require('xlsx-populate')
const config = require('../../config')
const log = require('./log')
const dateFormatter = require('./date-formatter')
const uploadDashboard = require('./dashboard/upload-dashboard')

module.exports = function (reductions, capacity, formattedCaseloadData) {
  const datestamp = dateFormatter.now().format('YYYYMMDDHH:mm:ss')
  console.log(`start of function: ${dateFormatter.now().format('mm:ss')}`)
  const outputFilepathOnWorker = config.WMT_DASHBOARD_OUTPUT_FILE_PATH + 'dashboard_' + datestamp + '.xlsx'
  return XlsxPopulate.fromFileAsync(config.WMT_DASHBOARD_TEMPLATE_FILE_PATH)
    .then(workbook => {
      console.log(`in from file async: ${dateFormatter.now().format('mm:ss')}`)
      // Modify the workbook.
      const reductionsSheet = workbook.sheet('reductions data')
      const capacitySheet = workbook.sheet('capacity data')
      const caseloadSheet = workbook.sheet('caseload data')
      // var capacityButtonsSheet = workbook.sheet('Capacity Buttons')
      // var reductionsButtonsSheet = workbook.sheet('Reductions Buttons')
      // var reductionsWorkingsSheet = workbook.sheet('reductions workings')
      // var clusterCodesSheet = workbook.sheet('cluster codes')
      populateSheet(reductions, reductionsSheet)
      populateSheet(formattedCaseloadData, caseloadSheet)
      populateSheet(capacity, capacitySheet)

      // reductionsSheet.hidden('very')
      // capacitySheet.hidden('very')
      // caseloadSheet.hidden('very')
      // capacityButtonsSheet.hidden('very')
      // reductionsButtonsSheet.hidden('very')
      // reductionsWorkingsSheet.hidden('very')
      // clusterCodesSheet.hidden('very')
      return workbook.outputAsync().then(function (body) {
        console.log(`in output async: ${dateFormatter.now().format('mm:ss')}`)
        return uploadDashboard(body, outputFilepathOnWorker)
      })
    })
    .catch(function (error) {
      log.error('An error occurred while reading the dashboard template')
      log.error(error)
      throw (error)
    })
}

const populateSheet = function (data, sheet) {
  sheet.cell('A2').value(data)
}

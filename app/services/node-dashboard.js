const XlsxPopulate = require('xlsx-populate')
const config = require('../../config')
const log = require('./log')
const dateFormatter = require('./date-formatter')
const uploadDashboard = require('./dashboard/upload-dashboard')

module.exports = function (reductions, capacity, formattedCaseloadData) {
  const datestamp = dateFormatter.now().format('YYYYMMDDHHmmss')
  const fileLocation = config.WMT_DASHBOARD_OUTPUT_FILE_PATH + 'dashboard_' + datestamp + '.xlsx'
  return XlsxPopulate.fromFileAsync(config.WMT_DASHBOARD_TEMPLATE_FILE_PATH)
    .then(workbook => {
      // Modify the workbook.
      const reductionsSheet = workbook.sheet('reductions data')
      const capacitySheet = workbook.sheet('capacity data')
      const caseloadSheet = workbook.sheet('caseload data')
      
      populateSheet(reductions, reductionsSheet)
      populateSheet(formattedCaseloadData, caseloadSheet)
      populateSheet(capacity, capacitySheet)

      return workbook.outputAsync().then(function (body) {
        return uploadDashboard(body, fileLocation)
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

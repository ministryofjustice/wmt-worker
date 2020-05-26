const XlsxPopulate = require('xlsx-populate')
const config = require('../../config')
const log = require('./log')
const dateFormatter = require('./date-formatter')

module.exports = function (reductions, capacity, formattedCaseloadData) {
  const datestamp = dateFormatter.now().format('YYYYMMDDHHmmss')
  var outputFilepathOnWorker = config.WMT_DASHBOARD_OUTPUT_FILE_PATH + 'dashboard_' + datestamp + '.xlsm'
  var outputFilepathOnWeb = config.WMT_WEB_DASHBOARD_OUTPUT_FILE_PATH + 'dashboard_' + datestamp + '.xlsm'

  return XlsxPopulate.fromFileAsync(config.WMT_DASHBOARD_TEMPLATE_FILE_PATH)
    .then(workbook => {
      // Modify the workbook.
      var reductionsSheet = workbook.sheet('reductions data')
      var capacitySheet = workbook.sheet('capacity data')
      var caseloadSheet = workbook.sheet('caseload data')
      // var capacityButtonsSheet = workbook.sheet('Capacity Buttons')
      // var reductionsButtonsSheet = workbook.sheet('Reductions Buttons')
      var reductionsWorkingsSheet = workbook.sheet('reductions workings')
      var clusterCodesSheet = workbook.sheet('cluster codes')
      populateSheet(reductions, reductionsSheet)
      populateSheet(formattedCaseloadData, caseloadSheet)
      populateSheet(capacity, capacitySheet)

      reductionsSheet.hidden('very')
      capacitySheet.hidden('very')
      caseloadSheet.hidden('very')
      // capacityButtonsSheet.hidden('very')
      // reductionsButtonsSheet.hidden('very')
      reductionsWorkingsSheet.hidden('very')
      clusterCodesSheet.hidden('very')

      return workbook.toFileAsync(outputFilepathOnWorker)
        .then(function () {
          return outputFilepathOnWeb
        })
        .catch(function (error) {
          log.error('An error occurred while writing the dashboard to', outputFilepathOnWorker)
          log.error(error)
          throw (error)
        })
    })
    .catch(function (error) {
      log.error('An error occurred while reading the dashboard template')
      log.error(error)
      throw (error)
    })
}

var populateSheet = function (data, sheet) {
  sheet.cell('A2').value(data)
}

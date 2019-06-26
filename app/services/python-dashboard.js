const PythonBridge = require('python-bridge')
const config = require('../../config')
const log = require('./log')
const dateFormatter = require('./date-formatter')

module.exports = function (reductions, capacity, formattedCaseloadData) {

  var python = PythonBridge()
  const datestamp = dateFormatter.now().format('YYYYMMDDHHmmss')
  var outputFilename = config.WMT_DASHBOARD_OUTPUT_FILE_PATH + 'dashboard_' + datestamp + '.xlsm'

  python.ex`
  from openpyxl import load_workbook
  import os

  def write_dashboard(reductions, capacity, caseload, templateFilepath, outputFilepath, outputDirectory, spreadsheetPassword):
    if not os.path.exists(outputDirectory):
      os.makedirs(outputDirectory)
    workbook = load_workbook(filename=templateFilepath, keep_vba=True)
    populate_data(reductions, workbook, 'reductions data')
    populate_data(capacity, workbook, 'capacity data')
    populate_data(caseload, workbook, 'caseload data')
    protect_sheets(workbook, spreadsheetPassword)
    workbook.save(filename=outputFilepath)

  def populate_data(data, workbook, sheetName):
    rowNum = 2
    colNum = 1
    worksheet = workbook[sheetName]
    for d in data:
      for col in d:
        worksheet.cell(row=rowNum, column=colNum).value = col
        colNum = colNum + 1
      colNum = 1
      rowNum = rowNum + 1

  def protect_sheets(workbook, spreadsheetPassword):
    for sheet in workbook.sheetnames:
      ws = workbook[sheet]
      ws.protection.password = spreadsheetPassword
    workbook['caseload data'].sheet_state = 'hidden'
    workbook['capacity data'].sheet_state = 'hidden'
    workbook['reductions data'].sheet_state = 'hidden'`

  
  return python`write_dashboard(${reductions}, ${capacity}, ${formattedCaseloadData}, ${config.WMT_DASHBOARD_TEMPLATE_FILE_PATH}, ${outputFilename}, ${config.WMT_DASHBOARD_OUTPUT_FILE_PATH}, ${config.WMT_DASHBOARD_PASSWORD})`
    .then(function () {
      log.info('Python has finished Generating the dashboard')
      return outputFilename
    })
    .catch(function (error) {
      log.error('Python encountered an error while generating the dashboard')
      log.error(error)
      throw (error)
    })
    .finally(function () {
      python.end()
      log.info('Closing Python Bridge')
    })
}

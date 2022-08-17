const logger = require('../log')
const dashboard = require('../dashboard')
const recordEtlExecutionTime = require('../record-etl-execution-time')
const updateWorkloadReportStatus = require('../data/update-workload-report-with-status')
const { COMPLETE } = require('../../constants/workload-report-status')

module.exports.execute = async function (task) {
  return dashboard()
    .then(function (fileDetails) {
      logger.info('GENERATE DASHBOARD - Dashboard Saved to', fileDetails.filepath, 'with id', fileDetails.fileId)
      return recordEtlExecutionTime(task.workloadReportId).then(function () {
        return updateWorkloadReportStatus(task.workloadReportId, COMPLETE)
      })
    }).catch(function (error) {
      logger.error('GENERATE DASHBOARD - Unable to Generate Dashboard')
      logger.error(error)
      throw (error)
    })
}

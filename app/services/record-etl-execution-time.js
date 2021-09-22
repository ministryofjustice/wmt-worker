const getWorkloadReportById = require('./data/get-workload-report-by-id')
const log = require('./log')

module.exports = function (newWorkloadReportId) {
  return getWorkloadReportById(newWorkloadReportId)
    .then(function (result) {
      log.trackExecutionTime('NART Extract', new Date().getTime() - new Date(result[0].effective_from).getTime(), true)
    })
}

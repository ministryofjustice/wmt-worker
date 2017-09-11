const getCurrentWorkloadReport = require('./data/get-current-workload-report')
const updateWorkloadReportEffectiveEndDate = require('./data/update-workload-report-effective-to')

module.exports = function (newWorkloadReportId) {
  return getCurrentWorkloadReport()
    .then(function (results) {
      var currentWorkload = results.filter((item) => item.id !== newWorkloadReportId)
      var newWorkload = results.filter((item) => item.id === newWorkloadReportId)

      return updateWorkloadReportEffectiveEndDate(currentWorkload[0].id, newWorkload[0].effective_from)
    })
}

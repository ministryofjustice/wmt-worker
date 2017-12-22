const getOpenWorkloadReports = require('./data/get-open-workload-reports')
const updateWorkloadReportEffectiveEndDate = require('./data/update-workload-report-effective-to')

module.exports = function (newWorkloadReportId) {
  return getOpenWorkloadReports()
    .then(function (results) {
      var id = 0
      var effectiveFrom = new Date()
      var currentWorkload = results.filter((item) => item.id !== newWorkloadReportId)
      var newWorkload = results.filter((item) => item.id === newWorkloadReportId)
      if (currentWorkload && currentWorkload.length > 0) {
        id = currentWorkload[0].id
      }
      if (newWorkload && newWorkload.length > 0) {
        effectiveFrom = newWorkload[0].effective_from
      }
      return updateWorkloadReportEffectiveEndDate(id, effectiveFrom)
      .then(function () {
        return id
      })
    })
}

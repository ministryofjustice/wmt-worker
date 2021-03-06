const getOpenWorkloadReports = require('./data/get-open-workload-reports')
const updateWorkloadReportEffectiveEndDate = require('./data/update-workload-report-effective-to')

module.exports = function (newWorkloadReportId) {
  return getOpenWorkloadReports()
    .then(function (results) {
      let id = 0
      let effectiveFrom = new Date()
      const currentWorkload = results.filter((item) => item.id !== newWorkloadReportId)
      const newWorkload = results.filter((item) => item.id === newWorkloadReportId)
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

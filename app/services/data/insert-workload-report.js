const knex = require('../../../knex').appSchema
const workloadReportStatus = require('../../constants/workload-report-status')

module.exports = function () {
  const workloadReport = getDefaultWorkloadReport()
  return knex('workload_report')
    .withSchema('app')
    .insert(workloadReport)
    .returning(['id', 'effective_from'])
    .then(function (result) {
      return result[0]
    })
}

function getDefaultWorkloadReport () {
  return {
    status: workloadReportStatus.INPROGRESS
  }
}

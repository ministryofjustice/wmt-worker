const knex = require('../../../knex').appSchema
const workloadReportStatus = require('../../constants/workload-report-status')

module.exports = function (effectiveFrom) {
  const workloadReport = getDefaultWorkloadReport(effectiveFrom)
  return knex('workload_report')
    .withSchema('app')
    .insert(workloadReport)
    .returning('id')
    .then(function ([result]) {
      return result.id
    })
}

function getDefaultWorkloadReport (effectiveFrom) {
  return {
    status: workloadReportStatus.INPROGRESS,
    effective_from: effectiveFrom
  }
}

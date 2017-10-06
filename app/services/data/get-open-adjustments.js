const knexConfig = require('../../../knexfile').app
const knex = require('knex')(knexConfig)

module.exports = function (workloadStagingIdStart, workloadStagingIdEnd, workloadReportId) {
  return knex('adjustments')
    .join('workload', 'workload.workload_owner_id', 'adjustments.workload_owner_id')
    .select(
      'adjustments.id AS id',
      'adjustments.effective_from AS effectiveFrom',
      'adjustments.effective_to AS effectiveTo',
      'adjustments.status AS status'
    )
    .whereRaw('workload.staging_id BETWEEN ? AND ? AND (status IS NULL OR status IN (\'ACTIVE\',\'SCHEDULED\'))' +
      ' AND workload.workload_report_id = ?', [workloadStagingIdStart, workloadStagingIdEnd, workloadReportId])
}

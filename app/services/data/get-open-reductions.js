const knex = require('../../../knex').appSchema
const reductionStatus = require('../../constants/reduction-status')

module.exports = function (workloadStagingIdStart, workloadStagingIdEnd, workloadReportId) {
  return knex('reductions')
    .join('workload', 'workload.workload_owner_id', 'reductions.workload_owner_id')
    .select(
      'reductions.id AS id',
      'reductions.effective_from AS effectiveFrom',
      'reductions.effective_to AS effectiveTo',
      'reductions.status AS status'
    )
    .whereRaw('workload.staging_id BETWEEN ? AND ? ' +
      'AND (status IS NULL OR status IN (\'' + reductionStatus.ACTIVE + '\',\'' + reductionStatus.SCHEDULED + '\')) ' +
      'AND workload.workload_report_id = ?', [workloadStagingIdStart, workloadStagingIdEnd, workloadReportId])
}

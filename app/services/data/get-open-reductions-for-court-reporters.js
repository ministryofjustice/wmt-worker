const knex = require('../../../knex').appSchema
const reductionStatus = require('../../constants/reduction-status')

module.exports = function (courtReportStagingIdStart, courtReportStagingIdEnd, workloadReportId) {
  return knex('reductions')
    .withSchema('app')
    .join('court_reports', 'court_reports.workload_owner_id', 'reductions.workload_owner_id')
    .select(
      'reductions.id AS id',
      'reductions.effective_from AS effectiveFrom',
      'reductions.effective_to AS effectiveTo',
      'reductions.status AS status'
    )
    .whereRaw('court_reports.staging_id BETWEEN ? AND ? ' +
      'AND (status IS NULL OR status IN (\'' + reductionStatus.ACTIVE + '\',\'' + reductionStatus.SCHEDULED + '\')) ' +
      'AND court_reports.workload_report_id = ?', [courtReportStagingIdStart, courtReportStagingIdEnd, workloadReportId])
}

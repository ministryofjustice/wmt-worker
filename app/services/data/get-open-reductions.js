const knex = require('../../../knex').appSchema
const reductionStatus = require('../../constants/reduction-status')

module.exports = function (workloadStagingIdStart, workloadStagingIdEnd, workloadReportId) {
  return knex('reductions')
    .withSchema('app')

    .join('reduction_reason', 'reduction_reason.id', 'reductions.reduction_reason_id')
    .join('workload_owner', 'workload_owner.id', 'reductions.workload_owner_id')
    .join('workload', 'workload.workload_owner_id', 'workload_owner.id')
    .join('offender_manager', 'offender_manager.id', 'workload_owner.offender_manager_id')
    .join('team', 'team.id', 'workload_owner.team_id')
    .join('ldu', 'ldu.id', 'team.ldu_id')
    .join('region', 'region.id', 'ldu.region_id')
    .select(
      'reductions.id AS id',
      'reductions.effective_from AS effectiveFrom',
      'reductions.effective_to AS effectiveTo',
      'reductions.status AS status',
      'reduction_reason.reason AS reason',
      'offender_manager.forename AS forename',
      'offender_manager.surname AS surname',
      'team.code AS teamCode',
      'team.description AS teamDescription',
      'ldu.code AS lduCode',
      'ldu.description AS lduDescription',
      'region.code AS regionCode',
      'region.description AS regionDescription',
      'reductions.hours AS hours',
      'reductions.notes AS additionalNotes'
    )
    .whereRaw('workload.staging_id BETWEEN ? AND ? ' +
      'AND (status IS NULL OR status IN (\'' + reductionStatus.ACTIVE + '\',\'' + reductionStatus.SCHEDULED + '\')) ' +
      'AND workload.workload_report_id = ?', [workloadStagingIdStart, workloadStagingIdEnd, workloadReportId])
}

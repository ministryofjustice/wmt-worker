const knex = require('../../../knex').appSchema

module.exports = function (teamCode, staffCode, workloadReportId) {
  const selectColumns = [
    'workload_points_calculations.available_points AS availablePoints',
    'workload_points_calculations.total_points AS totalPoints'
  ]

  return knex('workload_owner')
    .withSchema('app')
    .join('team', 'workload_owner.team_id', 'team.id')
    .join('workload', 'workload_owner.id', 'workload.workload_owner_id')
    .join('workload_points_calculations', 'workload.id', 'workload_points_calculations.workload_id')
    .join('workload_report', 'workload_points_calculations.workload_report_id', 'workload_report.id')
    .join('offender_manager', 'workload_owner.offender_manager_id', 'offender_manager.id')
    .select(selectColumns)
    .where('workload_report.id', workloadReportId)
    .where('team.code', teamCode)
    .where('offender_manager.key', staffCode)
}

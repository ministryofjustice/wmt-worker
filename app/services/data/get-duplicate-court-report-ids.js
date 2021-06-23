const knex = require('../../../knex').appSchema

module.exports = function (workloadOwnerId) {
  return knex('workload_owner')
    .withSchema('app')
    .join('team', 'workload_owner.team_id', 'team.id')
    .join('offender_manager', 'offender_manager.id', 'workload_owner.offender_manager_id')
    .join('offender_manager_type', 'offender_manager_type.id', 'offender_manager.type_id')
    .join('court_reports', 'workload_owner.id', 'court_reports.workload_owner_id')
    .join('court_reports_calculations', 'court_reports_calculations.court_reports_id', 'court_reports.id')
    .join('workload_report', 'workload_report.id', 'court_reports_calculations.workload_report_id')
    .select('court_reports.id AS court_reports_id')
    .whereNotNull('workload_report.effective_from')
    .whereNull('workload_report.effective_to')
    .andWhere('workload_owner.id', workloadOwnerId)
}

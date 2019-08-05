const knex = require('../../../knex').appSchema

module.exports = function (workload_owner_id) {
  return knex('workload_points_calculations')
    .join('workload', 'workload_points_calculations.workload_id', 'workload.id')
    .join('workload_owner', 'workload.workload_owner_id', 'workload_owner.id')
    .join('workload_report', 'workload_points_calculations.workload_report_id', 'workload_report.id')
    .join('team', 'workload_owner.team_id', 'team.id')
    .join('offender_manager', 'workload_owner.offender_manager_id', 'offender_manager.id')
    .join('offender_manager_type', 'offender_manager.type_id', 'offender_manager_type.id')
    .select('workload_points_calculations.id AS wpc_id')
    .whereNull('workload_report.effective_to')
    .andWhere('workload_owner.id', workload_owner_id)
}

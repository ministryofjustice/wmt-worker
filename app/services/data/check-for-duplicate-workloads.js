const knex = require('../../../knex').appSchema
const workloadReportStatus = require('../../constants/workload-report-status')

module.exports = function () {
  return knex('workload_points_calculations')
    .withSchema('app')
    .select('workload_owner.id AS link_id')
    .join('workload', 'workload_points_calculations.workload_id', 'workload.id')
    .join('workload_owner', 'workload.workload_owner_id', 'workload_owner.id')
    .join('workload_report', 'workload_points_calculations.workload_report_id', 'workload_report.id')
    .where('workload_report.status', workloadReportStatus.INPROGRESS)
    .groupBy('workload_owner.id')
    .having(knex.raw('count(workload_owner.id)'), '>', 1)
}

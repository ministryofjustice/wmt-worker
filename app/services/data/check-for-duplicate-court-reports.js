const knex = require('../../../knex').appSchema
const workloadReportStatus = require('../../constants/workload-report-status')

module.exports = function () {
  return knex('workload_owner')
    .withSchema('app')
    .select('workload_owner.id as id')
    .join('court_reports', 'workload_owner.id', 'court_reports.workload_owner_id')
    .join('court_reports_calculations', 'court_reports_calculations.court_reports_id', 'court_reports.id')
    .join('workload_report', 'workload_report.id', 'court_reports_calculations.workload_report_id')
    .where('workload_report.status', workloadReportStatus.INPROGRESS)
    .groupBy('workload_owner.id')
    .having(knex.raw('count(workload_owner.id)'), '>', 1)
}

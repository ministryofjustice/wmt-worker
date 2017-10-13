const knex = require('../../../knex').appSchema

module.exports = function (workloadReportId, type) {
  return knex('tasks')
    .select('id',
            'workload_report_id',
            'status')
    .where('workload_report_id', workloadReportId)
    .where('type', type)
}

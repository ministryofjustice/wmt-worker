const knex = require('../../../knex').appSchema

module.exports = function (type, workloadReportId) {
  return knex('tasks').withSchema('app')
    .where('type', type)
    .where('workload_report_id', workloadReportId)
    .count('* AS theCount')
}

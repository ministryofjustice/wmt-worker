const knexConfig = require('../../../knexfile').app
const knex = require('knex')(knexConfig)

module.exports = function (workloadReportId, type) {
  return knex('tasks')
    .select('id',
            'workload_report_id',
            'status')
    .where('workload_report_id', workloadReportId)
    .where('type', type)
}

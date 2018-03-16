const knex = require('../../../knex').appSchema

module.exports = function (reportId, workloadId) {
  return knex('workload_points_calculations')
    .where('workload_report_id', reportId)
    .andWhere('workload_id', workloadId)
    .first('workload_id')
}

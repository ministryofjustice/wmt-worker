const knex = require('../../../knex').appSchema

module.exports = function (startingId, maxId, reportId) {
  return knex('court_reports')
    .select('workload_owner_id AS workloadOwnerId', 'id')
    .whereBetween('staging_id', [startingId, maxId])
    .andWhere('workload_report_id', reportId)
}

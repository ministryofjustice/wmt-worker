const knex = require('../../../knex').appSchema

module.exports = function (startingId, maxId, reportId) {
  var selectCols = [
    'workload_owner_id AS workloadOwnerId',
    'id'
  ]
  return knex('court_reports')
  .select(selectCols)
  .whereBetween('staging_id', [startingId, maxId])
  .andWhere('workload_report_id', reportId)
}

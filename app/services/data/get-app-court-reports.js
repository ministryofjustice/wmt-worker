const knex = require('../../../knex').appSchema

module.export = function (startingId, maxId, reportId) {
  var selectCols = [
    'workload_owner_id AS workloadOwnerId',
    'id'
  ]
  return knex('court-reports')
  .select(selectCols)
  .whereBetween('staging_id', [startingId, maxId])
  .andWhere('workload_report_id', reportId)
}

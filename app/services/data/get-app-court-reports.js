module.export = function(startId, endId, reportId) {
  
  var selectCols = [
    'workload_owner_id AS workloadOwnerId',
    'id'
  ]
  return knex('court-reports')
  .select('workload_owner_id AS workloadOwnerId')
  .whereBetween('staging_id', [startId, endId])
  .andWhere('workload_report_id', reportId)
}
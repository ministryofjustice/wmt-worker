const knex = require('../../../knex').appSchema

module.exports = function (workloadStagingIdStart, workloadStagingIdEnd, workloadReportId) {
  return knex('workload')
    .withSchema('app')
    .select('workload_owner_id AS workloadOwnerId')
    .whereBetween('staging_id', [workloadStagingIdStart, workloadStagingIdEnd])
    .andWhere('workload_report_id', workloadReportId)
    .then(function (results) {
      const ids = []
      results.forEach(function (result) {
        ids.push(result.workloadOwnerId)
      })
      return ids
    })
}

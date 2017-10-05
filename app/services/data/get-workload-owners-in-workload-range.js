const knexConfig = require('../../../knexfile').app
const knex = require('knex')(knexConfig)

module.exports = function (workloadStagingIdStart, workloadStagingIdEnd) {
  return knex('workload')
  .select('workload_owner_id AS workloadOwnerId')
  .whereBetween('staging_id', [workloadStagingIdStart, workloadStagingIdEnd])
  .then(function (results) {
    var ids = []
    results.forEach(function (result) {
      ids.push(result.workloadOwnerId)
    })
    return ids
  })
}

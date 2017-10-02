const knexConfig = require('../../../knexfile').app
const knex = require('knex')(knexConfig)

module.exports = function (workloadStartId, workloadEndId) {
  return knex('workload')
  .select('workload_owner_id AS id')
  .whereBetween('id', [workloadStartId, workloadEndId])
  .then(function (results) {
    var ids = []
    results.forEach(function (result) {
      ids.push(result.id)
    })
    return ids
  })
}

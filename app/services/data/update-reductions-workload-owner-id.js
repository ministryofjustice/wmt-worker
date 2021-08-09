const knex = require('../../../knex').appSchema
const log = require('../log')

module.exports = function (oldWorkloadOwnerId, newWorkloadOwnerId) {
  return knex('reductions')
    .where('workload_owner_id', oldWorkloadOwnerId)
    .update('workload_owner_id', newWorkloadOwnerId)
    .catch(function (error) {
      log.error(error)
      log.info(oldWorkloadOwnerId, newWorkloadOwnerId)
      throw error
    })
}

const knex = require('../../../knex').appSchema
const log = require('../log')

module.exports = function (oldWorkloadOwnerId, newWorkloadOwnerId, reportId) {
  return knex('workload')
    .withSchema('app')
    .where('workload_owner_id', oldWorkloadOwnerId)
    .where('workload_report_id', '<=', reportId)
    .update('workload_owner_id', newWorkloadOwnerId)
    .then(function () {
      return knex('adjustments')
        .where('workload_owner_id', oldWorkloadOwnerId)
        .update('workload_owner_id', newWorkloadOwnerId)
    })
    .then(function () {
      return knex('reductions')
        .where('workload_owner_id', oldWorkloadOwnerId)
        .update('workload_owner_id', newWorkloadOwnerId)
    })
    .catch(function (error) {
      log.error(error)
      log.info(oldWorkloadOwnerId, newWorkloadOwnerId)
      throw error
    })
}

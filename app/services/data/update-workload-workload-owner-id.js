const knex = require('../../../knex').appSchema

module.exports = function (oldWorkloadOwnerId, newWorkloadOwnerId) {
  return knex('workload')
    .where('workload_owner_id', oldWorkloadOwnerId)
    .update({
      workload_owner_id: newWorkloadOwnerId
    })
    .then(function () {
      return knex('adjustments')
      .where('workload_owner_id', oldWorkloadOwnerId)
      .update({
        workload_owner_id: newWorkloadOwnerId
      })
    })
}

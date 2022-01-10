const knex = require('../../../knex').appSchema

module.exports = function (newWorkloadOwnerId, existingWorkloadOwnerIds) {
  return knex('omic_workload')
    .withSchema('app')
    .whereIn('workload_owner_id', existingWorkloadOwnerIds)
    .update({
      workload_owner_id: newWorkloadOwnerId
    })
}

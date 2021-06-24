const knex = require('../../../knex').appSchema

module.exports = function (woIds) {
  return knex('workload')
    .withSchema('app')
    .join('workload_owner', 'workload.workload_owner_id', 'workload_owner.id')
    .first('workload_owner_id AS workloadOwnerId', 'contracted_hours AS contractedHours')
    .whereIn('workload_owner_id', woIds)
    .orderBy('workload.id', 'desc')
}

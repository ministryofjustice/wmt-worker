const knex = require('../../../knex').appSchema

module.exports = function (workloadOwnerId, contractedHours) {
  return knex('workload_owner')
    .withSchema('app')
    .where('id', workloadOwnerId)
    .update('contracted_hours', contractedHours)
}

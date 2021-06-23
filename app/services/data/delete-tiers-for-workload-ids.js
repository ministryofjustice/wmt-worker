const knex = require('../../../knex').appSchema

module.exports = function (workloadIds) {
  return knex('tiers')
    .withSchema('app')
    .whereIn('tiers.workload_id', workloadIds)
    .del()
}

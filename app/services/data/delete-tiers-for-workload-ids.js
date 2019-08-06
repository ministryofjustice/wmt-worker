const knex = require('../../../knex').appSchema

module.exports = function (workloadIds) {
  return knex('tiers')
    .whereIn('tiers.workload_id', workloadIds)
    .del()
}

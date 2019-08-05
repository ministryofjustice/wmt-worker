const knex = require('../../../knex').appSchema

module.exports = function (workload_ids) {
  return knex('tiers')
    .whereIn('tiers.workload_id', workload_ids)
    .del()
}

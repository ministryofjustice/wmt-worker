const knex = require('../../../knex').appSchema

module.exports = function (workload_ids) {
  return knex('workload_points_calculations')
    .whereIn('workload_points_calculations.id', workload_ids)
    .del()
}

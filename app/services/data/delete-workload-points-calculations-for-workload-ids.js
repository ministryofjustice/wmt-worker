const knex = require('../../../knex').appSchema

module.exports = function (workloadIds) {
  return knex('workload_points_calculations')
    .withSchema('app')
    .whereIn('workload_points_calculations.workload_id', workloadIds)
    .del()
}

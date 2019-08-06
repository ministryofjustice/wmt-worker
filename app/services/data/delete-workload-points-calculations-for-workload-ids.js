const knex = require('../../../knex').appSchema

module.exports = function (workloadIds) {
  return knex('workload_points_calculations')
    .whereIn('workload_points_calculations.id', workloadIds)
    .del()
}

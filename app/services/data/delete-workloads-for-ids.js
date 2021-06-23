const knex = require('../../../knex').appSchema

module.exports = function (workloadIds) {
  return knex('workload')
    .withSchema('app')
    .whereIn('workload.id', workloadIds)
    .del()
}

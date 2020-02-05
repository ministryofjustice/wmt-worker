const knex = require('../../../knex').appSchema

module.exports = function (workloadIds) {
  return knex('workload')
    .whereIn('workload.id', workloadIds)
    .del()
}

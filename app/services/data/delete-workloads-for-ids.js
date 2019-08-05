const knex = require('../../../knex').appSchema

module.exports = function (workload_ids) {
  return knex('workload')
    .whereIn('workload.id', workload_ids)
    .del()
}

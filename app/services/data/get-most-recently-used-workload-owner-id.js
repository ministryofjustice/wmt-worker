const knex = require('../../../knex').appSchema

module.exports = function (woIds) {
  return knex('workload')
    .first()
    .whereIn('workload_owner_id', woIds)
    .orderBy('id', 'desc')
}

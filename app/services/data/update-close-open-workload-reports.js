const knex = require('../../../knex').appSchema

module.exports = function (effectiveTo, id) {
  return knex('workload_report')
    .withSchema('app')
    .update('effective_to', effectiveTo)
    .whereNull('effective_to')
    .whereNot('id', id)
}

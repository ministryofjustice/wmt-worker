const knex = require('../../../knex').appSchema

module.exports = function () {
  return knex('workload_report')
    .withSchema('app')
    .update('effective_to', new Date())
    .whereNull('effective_to')
}

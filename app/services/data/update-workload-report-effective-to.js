const knex = require('../../../knex').appSchema

module.exports = function (id, effectiveTo) {
  return knex('workload_report')
    .withSchema('app')
    .where('id', id)
    .update('effective_to', effectiveTo)
}

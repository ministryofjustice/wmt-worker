const knex = require('../../../knex').appSchema

module.exports = function () {
  return knex('workload_report')
    .withSchema('app')
    .whereNull('effective_to')
    .andWhereNot('effective_from', null)
    .select(
      'id',
      'effective_from'
    )
}

const knex = require('../../../knex').appSchema

module.exports = function (effectiveTo) {
  return knex('workload_report')
    .withSchema('app')
    .update({
      effective_to: effectiveTo,
      status: 'COMPLETE',
      status_description: 'COMPLETE'
    })
    .whereNull('effective_to')
}

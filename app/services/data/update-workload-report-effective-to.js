const knex = require('../../../knex').appSchema

module.exports = function (id, effectiveTo) {
  return knex('workload_report')
    .where('id', id)
    .update('effective_to', effectiveTo)
}

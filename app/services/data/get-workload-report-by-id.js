const knex = require('../../../knex').appSchema

module.exports = function (id) {
  return knex('workload_report')
    .withSchema('app')
    .where('id', id)
    .select(
      '*'
    )
}

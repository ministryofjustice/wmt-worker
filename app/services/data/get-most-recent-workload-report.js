const knex = require('../../../knex').appSchema

module.exports = function () {
  return knex('workload_report')
    .withSchema('app')
    .select('id')
    .limit(1)
    .orderBy('id', 'desc')
}

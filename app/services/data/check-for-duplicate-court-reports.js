const knex = require('../../../knex').appSchema

module.exports = function () {
  return knex('individual_court_reporter_overview')
    .withSchema('app')
    .select('id')
    .groupBy('id')
    .having(knex.raw('count(id)'), '>', 1)
}

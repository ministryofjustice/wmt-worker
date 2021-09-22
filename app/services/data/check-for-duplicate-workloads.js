const knex = require('../../../knex').appSchema

module.exports = function () {
  return knex('team_capacity_breakdown_view')
    .withSchema('app')
    .select('link_id')
    .groupBy('link_id')
    .having(knex.raw('count(link_id)'), '>', 1)
}

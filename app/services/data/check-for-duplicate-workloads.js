const knex = require('../../../knex').appSchema

module.exports = function () {
  return knex.schema.raw(
    'SELECT COUNT(link_id) AS linkIdCount, link_id FROM app.team_capacity_breakdown_view GROUP BY link_id HAVING COUNT(link_id) > 1'
  )
}

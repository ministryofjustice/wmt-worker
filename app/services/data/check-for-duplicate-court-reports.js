const knex = require('../../../knex').appSchema

module.exports = function () {
  return knex.schema.raw(
    'SELECT COUNT(id) AS idCount, id FROM app.individual_court_reporter_overview GROUP BY id HAVING COUNT(id) > 1'
  )
}

const knex = require('../../../knex').appSchema

module.exports = function (courtReports) {
  return knex('court_reports')
    .insert(courtReports)
    .returning('id')
}

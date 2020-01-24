const knex = require('../../../knex').appSchema

module.exports = function (courtReportIds) {
  return knex('court_reports')
    .whereIn('court_reports.id', courtReportIds)
    .del()
}

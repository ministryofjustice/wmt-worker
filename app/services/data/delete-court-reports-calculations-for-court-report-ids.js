const knex = require('../../../knex').appSchema

module.exports = function (courtReportIds) {
  return knex('court_reports_calculations')
    .whereIn('court_reports_calculations.court_reports_id', courtReportIds)
    .del()
}

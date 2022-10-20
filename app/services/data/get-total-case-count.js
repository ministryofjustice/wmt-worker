const knex = require('../../../knex').appSchema

module.exports = function () {
  return knex.sum('total_cases AS totalCases').from('national_case_overview')
    .withSchema('app').then(function ([result]) {
      return result.totalCases
    })
}

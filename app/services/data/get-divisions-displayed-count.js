const knex = require('../../../knex').appSchema

module.exports = function () {
  return knex('national_case_overview')
    .withSchema('app')
    .count('* AS divisionCount')
}

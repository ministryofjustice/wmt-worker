const knex = require('../../../knex').appSchema

module.exports = function () {
  return knex('app.national_case_overview')
    .count('* AS divisionCount')
}

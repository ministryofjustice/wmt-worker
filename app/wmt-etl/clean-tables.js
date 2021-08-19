const config = require('../../etl-config')
const knex = require('../../knex').stagingSchema

module.exports = function () {
  return Promise.all(config.VALID_SHEET_NAMES.map(function (table) {
    return knex(table).withSchema('staging').del()
  }))
}

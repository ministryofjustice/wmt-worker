const Promise = require('bluebird').Promise
const config = require('../../etl-config')
const knex = require('../../knex').stagingSchema

module.exports = function () {
  return Promise.each(config.VALID_SHEET_NAMES, function (table) {
    return knex(table).del()
  })
}

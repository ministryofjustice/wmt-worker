const config = require('../../etl-config')
const knex = require('../../knex').stagingSchema
const { arrayToPromise } = require('../services/helpers/promise-helper')
module.exports = function () {
  return arrayToPromise(config.VALID_SHEET_NAMES, function (table) {
    return knex(table).withSchema('staging').del()
  }).then(function () {
    return knex('tasks').withSchema('app').del()
  })
}

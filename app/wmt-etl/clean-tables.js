const config = require('../../etl-config')
const knex = require('../../knex').stagingSchema
const { arrayToPromise } = require('../services/helpers/promise-helper')
module.exports = function () {
  return arrayToPromise(config.VALID_SHEET_NAMES, function (table) {
    return knex(table).withSchema('staging').del()
  })
  .then(function () {
    return knex('arms').withSchema('staging').del()
  })
  .then(function () {
    return knex('inst_reports').withSchema('staging').del()
  })
  .then(function () {
    return knex('tasks').withSchema('app').del()
  }).then(function () {
    return knex('tiers').withSchema('app').truncate()
  }).then(function () {
    return knex('case_details').withSchema('app').truncate()
  }).then(function () {
    return knex('adjustments').withSchema('app').truncate()
  })
}

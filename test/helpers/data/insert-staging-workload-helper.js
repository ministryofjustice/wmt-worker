const knex = require('../../../knex').stagingSchema
const wmtExtract = require('../../constants/wmt-extract')
const wmtExtractFiltered = require('../../constants/wmt-extract-filtered')
const overdue = require('../../constants/flag-o-due')
const priority = require('../../constants/flag-priority')
const upw = require('../../constants/flag-upw')
const warrants = require('../../constants/flag-warr-4-n')
const suspendedSentenceOrders = require('../../constants/wmt-extract-sa')
const suspendedLifers = require('../../constants/suspended-lifers')
const deleteStagingRecords = require('./delete-staging-records')
var inserts = []
var stagingId

module.exports = function () {
  return deleteStagingRecords()
    .then(function () {
      return knex('wmt_extract')
      .insert(wmtExtract)
      .returning('id')
      .then(function (id) {
        stagingId = id
        return knex('wmt_extract_filtered')
          .insert(wmtExtractFiltered)
      })
    })
    .then(function () {
      overdue.forEach(function (record) {
        inserts.push(insertToStagingTable('flag_o_due', record))
      })
      priority.forEach(function (record) {
        inserts.push(insertToStagingTable('flag_priority', record))
      })
      upw.forEach(function (record) {
        inserts.push(insertToStagingTable('flag_upw', record))
      })
      warrants.forEach(function (record) {
        inserts.push(insertToStagingTable('flag_warr_4_n', record))
      })
      suspendedSentenceOrders.forEach(function (record) {
        inserts.push(insertToStagingTable('wmt_extract_sa', record))
      })
      suspendedLifers.forEach(function (record) {
        inserts.push(insertToStagingTable('suspended_lifers', record))
      })
      return Promise.all(inserts).then(function () { return stagingId })
    })
}

var insertToStagingTable = function (table, data) {
  return knex(table).insert(data)
}

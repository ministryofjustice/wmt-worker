const knex = require('../../../knex').stagingSchema
const omicWmtExtract = require('../../constants/omic-wmt-extract')
const deleteStagingOmicRecords = require('./delete-staging-omic-records')
var stagingId

module.exports = function () {
  return deleteStagingOmicRecords()
    .then(function () {
      return knex('omic_wmt_extract')
      .insert(omicWmtExtract)
      .returning('id')
      .then(function (id) {
        stagingId = id
        return stagingId
      })
    })
}

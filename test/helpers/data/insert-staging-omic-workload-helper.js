const knex = require('../../../knex').stagingSchema
const omicWmtExtract = require('../../constants/omic-wmt-extract')
const deleteStagingOmicRecords = require('./delete-staging-omic-records')
let stagingId

module.exports = function () {
  return deleteStagingOmicRecords()
    .then(function () {
      return knex('omic_teams')
      .insert(omicWmtExtract)
      .returning('id')
      .then(function (id) {
        stagingId = id
        return stagingId
      })
    })
}

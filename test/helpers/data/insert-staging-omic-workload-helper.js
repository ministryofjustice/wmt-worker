const knex = require('../../../knex').stagingSchema
const omicWmtExtract = require('../../constants/omic-wmt-extract')
const deleteStagingRecords = require('./delete-staging-records')
let stagingId

module.exports = function () {
  return deleteStagingRecords()
    .then(function () {
      return knex('omic_teams')
        .withSchema('staging')
        .insert(omicWmtExtract)
        .returning('id')
        .then(function (id) {
          stagingId = id[0]
          return stagingId
        })
    })
}

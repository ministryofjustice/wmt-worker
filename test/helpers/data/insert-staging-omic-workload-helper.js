const knex = require('../../../knex').stagingSchema
const omicWmtExtract = require('../../constants/omic-wmt-extract')
const deleteStagingRecords = require('./delete-staging-records')

module.exports = function () {
  return deleteStagingRecords()
    .then(function () {
      return knex('omic_teams')
        .withSchema('staging')
        .insert(omicWmtExtract)
        .returning('id')
        .then(function ([stagingId]) {
          return stagingId.id
        })
        .then(function (stagingId) {
          return knex('workload_report').withSchema('app').returning('id').insert({}).then(function ([result]) {
            return {
              stagingId,
              workloadReportId: result.id
            }
          })
        })
    })
}

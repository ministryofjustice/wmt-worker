const knex = require('../../../knex').stagingSchema
const Promise = require('bluebird').Promise
const OmCourtReports = require('../probation-rules').OmCourtReports
const CasesSummary = require('../probation-rules').CasesSummary
const CourtReport = require('../probation-rules').CourtReport

module.exports = function (range) {
  const omCourtReports = []

  const tableName = 'court_reporters'
  const selectCols = [
    'id AS staging_id',
    'trust',
    'region_desc',
    'region_code',
    'pdu_desc',
    'pdu_code',
    'team_desc',
    'team_code',
    'om_surname',
    'om_forename',
    'om_grade_code',
    'om_key',
    'sdr_last_30',
    'sdr_due_next_30',
    'sdr_conv_last_30',
    'oral_reports',
    'datestamp'
  ]

  return knex(tableName).withSchema('staging').whereBetween('id', range).select(selectCols)
    .then(function (results) {
      if (results !== 'undefined' && results.length > 0) {
        return Promise.each(results, function (result) {
          const casesSummary = new CasesSummary(
            result.trust,
            result.region_desc,
            result.region_code,
            result.pdu_desc,
            result.pdu_code,
            result.team_desc,
            result.team_code,
            result.om_surname,
            result.om_forename,
            result.om_grade_code,
            result.om_key,
            null,
            null,
            null,
            null,
            null,
            null,
            null
          )

          const courtReport = new CourtReport(
            result.om_key,
            result.om_grade_code,
            result.sdr_last_30,
            result.sdr_due_next_30,
            result.sdr_conv_last_30,
            result.oral_reports
          )

          const stagingId = result.staging_id

          omCourtReports.push(new OmCourtReports(stagingId, casesSummary, courtReport))
        })
          .then(function () {
            return omCourtReports
          })
      }
    })
}

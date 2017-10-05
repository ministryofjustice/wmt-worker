const config = require('../../../config')
const knexConfig = require('../../../knexfile').app
const knex = require('knex')(knexConfig)
const CaseDetails = require('wmt-probation-rules').CaseDetails

const columns = ['row_type', 'case_ref_no', 'tier_code', 'team_code', 'om_grade_code', 'om_key', 'location']

module.exports = function (omKey, teamCode) {
  var whereObject = {
    'om_key': omKey,
    'team_code': teamCode
  }
  return knex.select(columns).from(`${config.DB_STG_SCHEMA}.flag_warr_4_n`).where(whereObject).unionAll(function () {
    return this.select(columns).from(`${config.DB_STG_SCHEMA}.flag_upw`).where(whereObject).unionAll(function () {
      return this.select(columns).from(`${config.DB_STG_SCHEMA}.flag_o_due`).where(whereObject).unionAll(function () {
        return this.select(columns).from(`${config.DB_STG_SCHEMA}.flag_priority`).where(whereObject)
      })
    })
  })
  .then(function (results) {
    var casedetails = []
    if (results !== 'undefined' && results.length > 0) {
      for (var result of results) {
        casedetails.push(new CaseDetails(
          result.row_type,
          result.case_ref_no,
          result.tier_code,
          result.team_code,
          result.om_grade_code,
          result.om_key,
          result.location
        ))
      }
    }

    return casedetails
  })
}

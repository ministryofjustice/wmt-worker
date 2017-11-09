const config = require('../../../config')
const knex = require('../../../knex').appSchema
const CaseDetails = require('wmt-probation-rules').CaseDetails

const columns = ['case_ref_no', 'tier_code', 'team_code', 'om_grade_code', 'om_key', 'location']

module.exports = function (omKey, teamCode) {
  var whereObject = {
    'om_key': omKey,
    'team_code': teamCode
  }
  return knex.select(columns).from(`${config.DB_STG_SCHEMA}.wmt_extract_sa`).where(whereObject)
  .then(function (results) {
    var casedetails = []
    if (results !== 'undefined' && results.length > 0) {
      for (var result of results) {
        casedetails.push(new CaseDetails(
          'S',
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

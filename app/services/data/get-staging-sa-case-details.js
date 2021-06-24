const knex = require('../../../knex').stagingSchema
const CaseDetails = require('wmt-probation-rules').CaseDetails

const columns = ['case_ref_no', 'tier_code', 'team_code', 'om_grade_code', 'om_key', 'location']

module.exports = function (omKey, teamCode) {
  const whereObject = {
    om_key: omKey,
    team_code: teamCode
  }
  return knex.select(columns).withSchema('staging').from('wmt_extract_sa').where(whereObject)
    .then(function (results) {
      const casedetails = []
      if (results !== 'undefined' && results.length > 0) {
        for (const result of results) {
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

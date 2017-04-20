const config = require('../../../knexfile').development
const knex = require('knex')(config)
const CaseDetails = require('wmt-probation-rules').CaseDetails

const columns = ['row_type', 'case_ref_no', 'tier_code', 'team_code', 'om_grade_code', 'om_key', 'location']

module.exports = function () {
  return knex.select(columns).from('stg_flag_warr_4_n').unionAll(function () {
    return this.select(columns).from('stg_flag_upw').unionAll(function () {
      return this.select(columns).from('stg_flag_o_due').unionAll(function () {
        return this.select(columns).from('stg_flag_priority')
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

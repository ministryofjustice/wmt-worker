const config = require('../../../knexfile').development
const knex = require('knex')(config)
const CaseDetails = require('../domain/staging/case-details')

const caseDetailCols = ['row_type', 'case_ref_no', 'tier_code', 'team_code', 'om_grade_code', 'om_key', 'location']

module.exports = function () {
  return knex.select(caseDetailCols).from('stg_flag_warr_4_n').unionAll(function () {
    this.select(caseDetailCols).from('stg_flag_upw').unionAll(function () {
      this.select(caseDetailCols).from('stg_flag_o_due').unionAll(function () {
        this.select(caseDetailCols).from('stg_flag_priority')
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
    } else {
      return []
    }
    return casedetails
  })
}

const config = require('../../../config')
const knex = require('../../../knex').appSchema
const CaseDetails = require('../probation-rules').CaseDetails
const sanitiseLocation = require('./helpers/sanitise-location')

const columns = ['row_type', 'case_ref_no', 'tier_code', 'team_code', 'om_grade_code', 'om_key', 'location']

module.exports = function (omKey, teamCode) {
  const whereObject = {
    om_key: omKey,
    team_code: teamCode
  }
  return knex.select(columns).from(`${config.DB_STG_SCHEMA}.flag_warr_4_n`).where(whereObject).unionAll(function () {
    return this.select(columns).from(`${config.DB_STG_SCHEMA}.flag_upw`).where(whereObject).unionAll(function () {
      return this.select(columns).from(`${config.DB_STG_SCHEMA}.flag_o_due`).where(whereObject).unionAll(function () {
        return this.select(columns).from(`${config.DB_STG_SCHEMA}.flag_priority`).where(whereObject).unionAll(function () {
          return this.select(columns).from(`${config.DB_STG_SCHEMA}.wmt_extract_sa`).where(whereObject).unionAll(function () {
            return this.select(columns).from(`${config.DB_STG_SCHEMA}.suspended_lifers`).where(whereObject)
          })
        })
      })
    })
  })
    .then(function (results) {
      const casedetails = []
      if (results !== 'undefined' && results.length > 0) {
        for (const result of results) {
          casedetails.push(new CaseDetails(
            result.row_type,
            result.case_ref_no,
            result.tier_code,
            result.team_code,
            result.om_grade_code,
            result.om_key,
            sanitiseLocation(result.location) // WMT0047: Changing "Licence" (UK Spelling) to "License" (US Spelling)
          ))
        }
      }

      return casedetails
    })
}

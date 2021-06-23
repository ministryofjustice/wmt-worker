const knex = require('../../../knex').stagingSchema
const CasesSummary = require('wmt-probation-rules').CasesSummary
const Tiers = require('wmt-probation-rules').Tiers
const locations = require('wmt-probation-rules').Locations

module.exports = function (range) {
  return knex('wmt_extract').withSchema('staging').whereBetween('id', range)
    .then(function (results) {
      const caseSummary = []
      let communityTiers = []
      let licenseTiers = []
      let custodyTiers = []
      if (results !== 'undefined' && results.length > 0) {
        for (const result of results) {
          // WMT0229 Change needed here when extract column names are known
          communityTiers = new Tiers(
            locations.COMMUNITY,
            result.commtier0,
            result.commtierd2,
            result.commtierd1,
            result.commtierc2,
            result.commtierc1,
            result.commtierb2,
            result.commtierb1,
            result.commtiera
          )

          // WMT0229 Change needed here when extract column names are known
          licenseTiers = new Tiers(
            locations.LICENSE,
            result.licencetier0,
            result.licencetierd2,
            result.licencetierd1,
            result.licencetierc2,
            result.licencetierc1,
            result.licencetierb2,
            result.licencetierb1,
            result.licencetiera
          )

          // WMT0229 Change needed here when extract column names are known
          custodyTiers = new Tiers(
            locations.CUSTODY,
            result.custtier0,
            result.custtierd2,
            result.custtierd1,
            result.custtierc2,
            result.custtierc1,
            result.custtierb2,
            result.custtierb1,
            result.custtiera
          )
          caseSummary.push(new CasesSummary(
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
            communityTiers,
            licenseTiers,
            custodyTiers,
            result.comIn1st16Weeks,
            result.licIn1st16Weeks,
            result.datestamp
          ))
        }

        return caseSummary
      }
    })
}

const getStagingOmicWorkload = require('./data/get-staging-omic-workload')
const OmWorkload = require('wmt-probation-rules').OmWorkload
const CasesSummary = require('wmt-probation-rules').CasesSummary
const CourtReport = require('wmt-probation-rules').CourtReport
const InstitutionalReport = require('wmt-probation-rules').InstitutionalReport
const Tiers = require('wmt-probation-rules').Tiers
const locations = require('wmt-probation-rules').Locations
const getStagingCaseDetails = require('./data/get-staging-case-details')
const getArmsTotals = require('./data/get-arms-totals')
const Promise = require('bluebird').Promise

module.exports = function (range) {
  const omWorkloads = []
  return getStagingOmicWorkload(range)
    .then(function (results) {
      if (results !== 'undefined' && results.length > 0) {
        return Promise.each(results, function (result) {
          return getArmsTotals(result.om_key, result.team_code).then(function (armsCases) {
            const communityTiers = new Tiers(
              locations.COMMUNITY,
              result.commtier0,
              result.commtierd2,
              result.commtierd1,
              result.commtierc2,
              result.commtierc1,
              result.commtierb2,
              result.commtierb1,
              result.commtiera,
              result.commtiere,
              result.commtierf,
              result.commtierg
            )

            const licenseTiers = new Tiers(
              locations.LICENSE,
              result.licencetier0,
              result.licencetierd2,
              result.licencetierd1,
              result.licencetierc2,
              result.licencetierc1,
              result.licencetierb2,
              result.licencetierb1,
              result.licencetiera,
              result.licencetiere,
              result.licencetierf,
              result.licencetierg
            )

            const custodyTiers = new Tiers(
              locations.CUSTODY,
              result.custtier0,
              result.custtierd2,
              result.custtierd1,
              result.custtierc2,
              result.custtierc1,
              result.custtierb2,
              result.custtierb1,
              result.custtiera,
              result.custtiere,
              result.custtierf,
              result.custtierg
            )

            const t2aCommunityTiers = new Tiers(
              locations.COMMUNITY,
              result.t2a_commtier0,
              result.t2a_commtierd2,
              result.t2a_commtierd1,
              result.t2a_commtierc2,
              result.t2a_commtierc1,
              result.t2a_commtierb2,
              result.t2a_commtierb1,
              result.t2a_commtiera,
              result.t2a_commtiere,
              result.t2a_commtierf,
              result.t2a_commtierg
            )

            const t2aLicenseTiers = new Tiers(
              locations.LICENSE,
              result.t2a_licencetier0,
              result.t2a_licencetierd2,
              result.t2a_licencetierd1,
              result.t2a_licencetierc2,
              result.t2a_licencetierc1,
              result.t2a_licencetierb2,
              result.t2a_licencetierb1,
              result.t2a_licencetiera,
              result.t2a_licencetiere,
              result.t2a_licencetierf,
              result.t2a_licencetierg
            )

            const t2aCustodyTiers = new Tiers(
              locations.CUSTODY,
              result.t2a_custtier0,
              result.t2a_custtierd2,
              result.t2a_custtierd1,
              result.t2a_custtierc2,
              result.t2a_custtierc1,
              result.t2a_custtierb2,
              result.t2a_custtierb1,
              result.t2a_custtiera,
              result.t2a_custtiere,
              result.t2a_custtierf,
              result.t2a_custtierg
            )

            const casesSummary = new CasesSummary(
              result.trust,
              result.region_desc,
              result.region_code,
              result.ldu_desc,
              result.ldu_code,
              result.team_desc,
              result.team_code,
              result.om_surname,
              result.om_forename,
              result.om_grade_code,
              result.om_key,
              communityTiers,
              licenseTiers,
              custodyTiers,
              t2aCommunityTiers,
              t2aLicenseTiers,
              t2aCustodyTiers,
              result.comIn1st16Weeks,
              result.licIn1st16Weeks,
              armsCases.community,
              armsCases.license,
              communityTiers,
              licenseTiers,
              custodyTiers
            )

            const courtReport = new CourtReport(
              result.om_key,
              result.om_team_staff_grade,
              result.sdr_last_30,
              result.sdr_due_next_30,
              result.sdr_conv_last_30
            )

            const institutionalReport = new InstitutionalReport(
              result.om_key,
              result.om_team_staff_grade,
              result.parom_due_next_30,
              result.parom_comp_last_30
            )

            const stagingId = result.staging_id

            return getStagingCaseDetails(result.om_key, result.team_code).then(function (results) {
              omWorkloads.push(new OmWorkload(
                stagingId, casesSummary, courtReport, institutionalReport, results
              ))
            })
          })
        })
          .then(function () {
            return omWorkloads
          })
      }
    })
}

const getStagingWorkload = require('./data/get-staging-workload')
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
  var omWorkloads = []
  return getStagingWorkload(range)
    .then(function (results) {
      if (results !== 'undefined' && results.length > 0) {
        return Promise.each(results, function (result) {
          return getArmsTotals(result['om_key'], result['team_code']).then(function (armsCases) {
            var communityTiers = new Tiers(
              locations.COMMUNITY,
              result['commtier0'],
              result['commtierd2'],
              result['commtierd1'],
              result['commtierc2'],
              result['commtierc1'],
              result['commtierb2'],
              result['commtierb1'],
              result['commtiera']
            )

            var filteredCommunityTiers = new Tiers(
              locations.COMMUNITY,
              result['filtered_commtier0'],
              result['filtered_commtierd2'],
              result['filtered_commtierd1'],
              result['filtered_commtierc2'],
              result['filtered_commtierc1'],
              result['filtered_commtierb2'],
              result['filtered_commtierb1'],
              result['filtered_commtiera']
            )

            var licenseTiers = new Tiers(
              locations.LICENSE,
              result['licencetier0'],
              result['licencetierd2'],
              result['licencetierd1'],
              result['licencetierc2'],
              result['licencetierc1'],
              result['licencetierb2'],
              result['licencetierb1'],
              result['licencetiera']
            )

            var filteredLicenseTiers = new Tiers(
              locations.LICENSE,
              result['filtered_licencetier0'],
              result['filtered_licencetierd2'],
              result['filtered_licencetierd1'],
              result['filtered_licencetierc2'],
              result['filtered_licencetierc1'],
              result['filtered_licencetierb2'],
              result['filtered_licencetierb1'],
              result['filtered_licencetiera']
            )

            var custodyTiers = new Tiers(
              locations.CUSTODY,
              result['custtier0'],
              result['custtierd2'],
              result['custtierd1'],
              result['custtierc2'],
              result['custtierc1'],
              result['custtierb2'],
              result['custtierb1'],
              result['custtiera']
            )

            var filteredCustodyTiers = new Tiers(
              locations.CUSTODY,
              result['filtered_custtier0'],
              result['filtered_custtierd2'],
              result['filtered_custtierd1'],
              result['filtered_custtierc2'],
              result['filtered_custtierc1'],
              result['filtered_custtierb2'],
              result['filtered_custtierb1'],
              result['filtered_custtiera']
            )

            var t2aCommunityTiers = new Tiers(
              locations.COMMUNITY,
              result['t2a_commtier0'],
              result['t2a_commtierd2'],
              result['t2a_commtierd1'],
              result['t2a_commtierc2'],
              result['t2a_commtierc1'],
              result['t2a_commtierb2'],
              result['t2a_commtierb1'],
              result['t2a_commtiera']
            )

            var t2aLicenseTiers = new Tiers(
              locations.LICENSE,
              result['t2a_licencetier0'],
              result['t2a_licencetierd2'],
              result['t2a_licencetierd1'],
              result['t2a_licencetierc2'],
              result['t2a_licencetierc1'],
              result['t2a_licencetierb2'],
              result['t2a_licencetierb1'],
              result['t2a_licencetiera']
            )

            var t2aCustodyTiers = new Tiers(
              locations.CUSTODY,
              result['t2a_custtier0'],
              result['t2a_custtierd2'],
              result['t2a_custtierd1'],
              result['t2a_custtierc2'],
              result['t2a_custtierc1'],
              result['t2a_custtierb2'],
              result['t2a_custtierb1'],
              result['t2a_custtiera']
            )

            var casesSummary = new CasesSummary(
              result['trust'],
              result['region_desc'],
              result['region_code'],
              result['ldu_desc'],
              result['ldu_code'],
              result['team_desc'],
              result['team_code'],
              result['om_surname'],
              result['om_forename'],
              result['om_grade_code'],
              result['om_key'],
              communityTiers,
              licenseTiers,
              custodyTiers,
              t2aCommunityTiers,
              t2aLicenseTiers,
              t2aCustodyTiers,
              result['comIn1st16Weeks'],
              result['licIn1st16Weeks'],
              armsCases.community,
              armsCases.license,
              filteredCommunityTiers,
              filteredLicenseTiers,
              filteredCustodyTiers,
            )

            var courtReport = new CourtReport(
              result['om_key'],
              result['om_team_staff_grade'],
              result['sdr_last_30'],
              result['sdr_due_next_30'],
              result['sdr_conv_last_30']
            )

            var institutionalReport = new InstitutionalReport(
              result['om_key'],
              result['om_team_staff_grade'],
              result['parom_due_next_30'],
              result['parom_comp_last_30']
            )

            var stagingId = result['staging_id']

            return getStagingCaseDetails(result['om_key'], result['team_code']).then(function (results) {
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

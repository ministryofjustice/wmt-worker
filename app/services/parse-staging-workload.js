const getStagingWorkload = require('./data/get-staging-workload')
const OmWorkload = require('./probation-rules').OmWorkload
const CasesSummary = require('./probation-rules').CasesSummary
const CourtReport = require('./probation-rules').CourtReport
const InstitutionalReport = require('./probation-rules').InstitutionalReport
const Tiers = require('./probation-rules').Tiers
const locations = require('./probation-rules').Locations
const getStagingCaseDetails = require('./data/get-staging-case-details')
const getArmsTotals = require('./data/get-arms-totals')
const { arrayToPromise } = require('./helpers/promise-helper')

module.exports = function (range) {
  return getStagingWorkload(range)
    .then(function (results) {
      if (results !== 'undefined' && results.length > 0) {
        return arrayToPromise(results, function (result) {
          return getArmsTotals(result.om_key, result.team_code).then(function (armsCases) {
            // WMT0229 Change needed here when extract column names are known
            const communityTiers = new Tiers(
              locations.COMMUNITY,
              result.commtier0,
              result.commtierd0,
              result.commtierd1,
              result.commtierd2,
              result.commtierd3,
              result.commtierc0,
              result.commtierc1,
              result.commtierc2,
              result.commtierc3,
              result.commtierb0,
              result.commtierb1,
              result.commtierb2,
              result.commtierb3,
              result.commtiera0,
              result.commtiera1,
              result.commtiera2,
              result.commtiera3,
              result.commtierd0s,
              result.commtierd1s,
              result.commtierd2s,
              result.commtierd3s,
              result.commtierc0s,
              result.commtierc1s,
              result.commtierc2s,
              result.commtierc3s,
              result.commtierb0s,
              result.commtierb1s,
              result.commtierb2s,
              result.commtierb3s,
              result.commtiera0s,
              result.commtiera1s,
              result.commtiera2s,
              result.commtiera3s
            )

            // WMT0229 Change needed here when extract column names are known
            const filteredCommunityTiers = new Tiers(
              locations.COMMUNITY,
              result.filtered_commtier0,
              result.filtered_commtierd0,
              result.filtered_commtierd1,
              result.filtered_commtierd2,
              result.filtered_commtierd3,
              result.filtered_commtierc0,
              result.filtered_commtierc1,
              result.filtered_commtierc2,
              result.filtered_commtierc3,
              result.filtered_commtierb0,
              result.filtered_commtierb1,
              result.filtered_commtierb2,
              result.filtered_commtierb3,
              result.filtered_commtiera0,
              result.filtered_commtiera1,
              result.filtered_commtiera2,
              result.filtered_commtiera3,
              result.filtered_commtierd0s,
              result.filtered_commtierd1s,
              result.filtered_commtierd2s,
              result.filtered_commtierd3s,
              result.filtered_commtierc0s,
              result.filtered_commtierc1s,
              result.filtered_commtierc2s,
              result.filtered_commtierc3s,
              result.filtered_commtierb0s,
              result.filtered_commtierb1s,
              result.filtered_commtierb2s,
              result.filtered_commtierb3s,
              result.filtered_commtiera0s,
              result.filtered_commtiera1s,
              result.filtered_commtiera2s,
              result.filtered_commtiera3s
            )

            // WMT0229 Change needed here when extract column names are known
            const licenseTiers = new Tiers(
              locations.LICENSE,
              result.licencetier0,
              result.licencetierd0,
              result.licencetierd1,
              result.licencetierd2,
              result.licencetierd3,
              result.licencetierc0,
              result.licencetierc1,
              result.licencetierc2,
              result.licencetierc3,
              result.licencetierb0,
              result.licencetierb1,
              result.licencetierb2,
              result.licencetierb3,
              result.licencetiera0,
              result.licencetiera1,
              result.licencetiera2,
              result.licencetiera3,
              result.licencetierd0s,
              result.licencetierd1s,
              result.licencetierd2s,
              result.licencetierd3s,
              result.licencetierc0s,
              result.licencetierc1s,
              result.licencetierc2s,
              result.licencetierc3s,
              result.licencetierb0s,
              result.licencetierb1s,
              result.licencetierb2s,
              result.licencetierb3s,
              result.licencetiera0s,
              result.licencetiera1s,
              result.licencetiera2s,
              result.licencetiera3s
            )

            // WMT0229 Change needed here when extract column names are known
            const filteredLicenseTiers = new Tiers(
              locations.LICENSE,
              result.filtered_licencetier0,
              result.filtered_licencetierd0,
              result.filtered_licencetierd1,
              result.filtered_licencetierd2,
              result.filtered_licencetierd3,
              result.filtered_licencetierc0,
              result.filtered_licencetierc1,
              result.filtered_licencetierc2,
              result.filtered_licencetierc3,
              result.filtered_licencetierb0,
              result.filtered_licencetierb1,
              result.filtered_licencetierb2,
              result.filtered_licencetierb3,
              result.filtered_licencetiera0,
              result.filtered_licencetiera1,
              result.filtered_licencetiera2,
              result.filtered_licencetiera3,
              result.filtered_licencetierd0s,
              result.filtered_licencetierd1s,
              result.filtered_licencetierd2s,
              result.filtered_licencetierd3s,
              result.filtered_licencetierc0s,
              result.filtered_licencetierc1s,
              result.filtered_licencetierc2s,
              result.filtered_licencetierc3s,
              result.filtered_licencetierb0s,
              result.filtered_licencetierb1s,
              result.filtered_licencetierb2s,
              result.filtered_licencetierb3s,
              result.filtered_licencetiera0s,
              result.filtered_licencetiera1s,
              result.filtered_licencetiera2s,
              result.filtered_licencetiera3s
            )

            // WMT0229 Change needed here when extract column names are known
            const custodyTiers = new Tiers(
              locations.CUSTODY,
              result.custtier0,
              result.custtierd0,
              result.custtierd1,
              result.custtierd2,
              result.custtierd3,
              result.custtierc0,
              result.custtierc1,
              result.custtierc2,
              result.custtierc3,
              result.custtierb0,
              result.custtierb1,
              result.custtierb2,
              result.custtierb3,
              result.custtiera0,
              result.custtiera1,
              result.custtiera2,
              result.custtiera3,
              result.custtierd0s,
              result.custtierd1s,
              result.custtierd2s,
              result.custtierd3s,
              result.custtierc0s,
              result.custtierc1s,
              result.custtierc2s,
              result.custtierc3s,
              result.custtierb0s,
              result.custtierb1s,
              result.custtierb2s,
              result.custtierb3s,
              result.custtiera0s,
              result.custtiera1s,
              result.custtiera2s,
              result.custtiera3s
            )

            // WMT0229 Change needed here when extract column names are known
            const filteredCustodyTiers = new Tiers(
              locations.CUSTODY,
              result.filtered_custtier0,
              result.filtered_custtierd0,
              result.filtered_custtierd1,
              result.filtered_custtierd2,
              result.filtered_custtierd3,
              result.filtered_custtierc0,
              result.filtered_custtierc1,
              result.filtered_custtierc2,
              result.filtered_custtierc3,
              result.filtered_custtierb0,
              result.filtered_custtierb1,
              result.filtered_custtierb2,
              result.filtered_custtierb3,
              result.filtered_custtiera0,
              result.filtered_custtiera1,
              result.filtered_custtiera2,
              result.filtered_custtiera3,
              result.filtered_custtierd0s,
              result.filtered_custtierd1s,
              result.filtered_custtierd2s,
              result.filtered_custtierd3s,
              result.filtered_custtierc0s,
              result.filtered_custtierc1s,
              result.filtered_custtierc2s,
              result.filtered_custtierc3s,
              result.filtered_custtierb0s,
              result.filtered_custtierb1s,
              result.filtered_custtierb2s,
              result.filtered_custtierb3s,
              result.filtered_custtiera0s,
              result.filtered_custtiera1s,
              result.filtered_custtiera2s,
              result.filtered_custtiera3s
            )

            // WMT0229 Change needed here when extract column names are known
            const t2aCommunityTiers = new Tiers(
              locations.COMMUNITY,
              result.t2a_commtier0,
              result.t2a_commtierd0,
              result.t2a_commtierd1,
              result.t2a_commtierd2,
              result.t2a_commtierd3,
              result.t2a_commtierc0,
              result.t2a_commtierc1,
              result.t2a_commtierc2,
              result.t2a_commtierc3,
              result.t2a_commtierb0,
              result.t2a_commtierb1,
              result.t2a_commtierb2,
              result.t2a_commtierb3,
              result.t2a_commtiera0,
              result.t2a_commtiera1,
              result.t2a_commtiera2,
              result.t2a_commtiera3,
              result.t2a_commtierd0s,
              result.t2a_commtierd1s,
              result.t2a_commtierd2s,
              result.t2a_commtierd3s,
              result.t2a_commtierc0s,
              result.t2a_commtierc1s,
              result.t2a_commtierc2s,
              result.t2a_commtierc3s,
              result.t2a_commtierb0s,
              result.t2a_commtierb1s,
              result.t2a_commtierb2s,
              result.t2a_commtierb3s,
              result.t2a_commtiera0s,
              result.t2a_commtiera1s,
              result.t2a_commtiera2s,
              result.t2a_commtiera3s
            )

            // WMT0229 Change needed here when extract column names are known
            const t2aLicenseTiers = new Tiers(
              locations.LICENSE,
              result.t2a_licencetier0,
              result.t2a_licencetierd0,
              result.t2a_licencetierd1,
              result.t2a_licencetierd2,
              result.t2a_licencetierd3,
              result.t2a_licencetierc0,
              result.t2a_licencetierc1,
              result.t2a_licencetierc2,
              result.t2a_licencetierc3,
              result.t2a_licencetierb0,
              result.t2a_licencetierb1,
              result.t2a_licencetierb2,
              result.t2a_licencetierb3,
              result.t2a_licencetiera0,
              result.t2a_licencetiera1,
              result.t2a_licencetiera2,
              result.t2a_licencetiera3,
              result.t2a_licencetierd0s,
              result.t2a_licencetierd1s,
              result.t2a_licencetierd2s,
              result.t2a_licencetierd3s,
              result.t2a_licencetierc0s,
              result.t2a_licencetierc1s,
              result.t2a_licencetierc2s,
              result.t2a_licencetierc3s,
              result.t2a_licencetierb0s,
              result.t2a_licencetierb1s,
              result.t2a_licencetierb2s,
              result.t2a_licencetierb3s,
              result.t2a_licencetiera0s,
              result.t2a_licencetiera1s,
              result.t2a_licencetiera2s,
              result.t2a_licencetiera3s
            )

            // WMT0229 Change needed here when extract column names are known
            const t2aCustodyTiers = new Tiers(
              locations.CUSTODY,
              result.t2a_custtier0,
              result.t2a_custtierd0,
              result.t2a_custtierd1,
              result.t2a_custtierd2,
              result.t2a_custtierd3,
              result.t2a_custtierc0,
              result.t2a_custtierc1,
              result.t2a_custtierc2,
              result.t2a_custtierc3,
              result.t2a_custtierb0,
              result.t2a_custtierb1,
              result.t2a_custtierb2,
              result.t2a_custtierb3,
              result.t2a_custtiera0,
              result.t2a_custtiera1,
              result.t2a_custtiera2,
              result.t2a_custtiera3,
              result.t2a_custtierd0s,
              result.t2a_custtierd1s,
              result.t2a_custtierd2s,
              result.t2a_custtierd3s,
              result.t2a_custtierc0s,
              result.t2a_custtierc1s,
              result.t2a_custtierc2s,
              result.t2a_custtierc3s,
              result.t2a_custtierb0s,
              result.t2a_custtierb1s,
              result.t2a_custtierb2s,
              result.t2a_custtierb3s,
              result.t2a_custtiera0s,
              result.t2a_custtiera1s,
              result.t2a_custtiera2s,
              result.t2a_custtiera3s
            )

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
              communityTiers,
              licenseTiers,
              custodyTiers,
              t2aCommunityTiers,
              t2aLicenseTiers,
              t2aCustodyTiers,
              result.comin1st16weeks,
              result.licin1st16weeks,
              armsCases.community,
              armsCases.license,
              filteredCommunityTiers,
              filteredLicenseTiers,
              filteredCustodyTiers
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

            const stagingId = Number(result.staging_id)

            return getStagingCaseDetails(result.om_key, result.team_code).then(function (results) {
              return new OmWorkload(
                stagingId, casesSummary, courtReport, institutionalReport, results
              )
            })
          })
        })
      }
    })
}

const knex = require('../../../knex').stagingSchema
const OmWorkload = require('wmt-probation-rules').OmWorkload
const CasesSummary = require('wmt-probation-rules').CasesSummary
const CourtReport = require('wmt-probation-rules').CourtReport
const InstitutionalReport = require('wmt-probation-rules').InstitutionalReport
const Tiers = require('wmt-probation-rules').Tiers
const locations = require('wmt-probation-rules').Locations
const getStagingCaseDetails = require('../data/get-staging-case-details')
const getStagingSaCaseDetails = require('../data/get-staging-sa-case-details')
const getArmsTotals = require('../data/get-arms-totals')
const Promise = require('bluebird').Promise

module.exports = function (range) {
  var omWorkloads = []
  return knex('wmt_extract').whereBetween('wmt_extract.id', range)
    .leftJoin('t2a', function () {
      this.on('wmt_extract.om_key', 't2a.om_key')
        .andOn('wmt_extract.team_code', 't2a.team_code')
    })
    .leftJoin('court_reports', function () {
      this.on('court_reports.om_key', 'wmt_extract.om_key')
        .andOn('court_reports.team_code', 'wmt_extract.team_code')
    })
    .leftJoin('inst_reports', function () {
      this.on('inst_reports.om_key', 'wmt_extract.om_key')
        .andOn('inst_reports.team_code', 'wmt_extract.team_code')
    })
    .select('wmt_extract.id AS staging_id', 'wmt_extract.trust', 'wmt_extract.region_desc', 'wmt_extract.region_code',
    'wmt_extract.ldu_desc', 'wmt_extract.ldu_code', 'wmt_extract.team_desc', 'wmt_extract.team_code',
    'wmt_extract.om_surname', 'wmt_extract.om_forename', 'wmt_extract.om_grade_code',
    'wmt_extract.om_key', 'wmt_extract.comIn1st16Weeks', 'wmt_extract.licIn1st16Weeks',
    'wmt_extract.datestamp', 'wmt_extract.commtier0', 'wmt_extract.commtierd2',
    'wmt_extract.commtierd1', 'wmt_extract.commtierc2', 'wmt_extract.commtierc1',
    'wmt_extract.commtierb2', 'wmt_extract.commtierb1', 'wmt_extract.commtiera',
    'wmt_extract.licencetier0', 'wmt_extract.licencetierd2', 'wmt_extract.licencetierd1',
    'wmt_extract.licencetierc2', 'wmt_extract.licencetierc1', 'wmt_extract.licencetierb2',
    'wmt_extract.licencetierb1', 'wmt_extract.licencetiera', 'wmt_extract.custtier0',
    'wmt_extract.custtierd2', 'wmt_extract.custtierd1', 'wmt_extract.custtierc2',
    'wmt_extract.custtierc1', 'wmt_extract.custtierb2', 'wmt_extract.custtierb1',
    'wmt_extract.custtiera', 't2a.commtier0 AS t2a_commtier0  ', 't2a.commtierd2 AS t2a_commtierd2',
    't2a.commtierd1 AS t2a_commtierd1', 't2a.commtierc2 AS t2a_commtierc2',
    't2a.commtierc1 AS t2a_commtierc1', 't2a.commtierb2 AS t2a_commtierb2',
    't2a.commtierb1 AS t2a_commtierb1', 't2a.commtiera AS t2a_commtiera',
    't2a.licencetier0 AS t2a_licencetier0', 't2a.licencetierd2 AS t2a_licencetierd2',
    't2a.licencetierd1 AS t2a_licencetierd1', 't2a.licencetierc2 AS t2a_licencetierc2',
    't2a.licencetierc1 AS t2a_licencetierc1', 't2a.licencetierb2 AS t2a_licencetierb2',
    't2a.licencetierb1 AS t2a_licencetierb1', 't2a.licencetiera AS t2a_licencetiera',
    't2a.custtier0 AS t2a_custtier0', 't2a.custtierd2 AS t2a_custtierd2',
    't2a.custtierd1 AS t2a_custtierd1', 't2a.custtierc2 AS t2a_custtierc2',
    't2a.custtierc1 AS t2a_custtierc1', 't2a.custtierb2 AS t2a_custtierb2',
    't2a.custtierb1 AS t2a_custtierb1', 't2a.custtiera AS t2a_custtiera',
    'court_reports.om_team_staff_grade', 'court_reports.sdr_last_30',
    'court_reports.sdr_due_next_30', 'court_reports.sdr_conv_last_30',
    'inst_reports.parom_due_next_30', 'inst_reports.parom_comp_last_30')
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
              armsCases.license
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
              var caseDetails = results
              return getStagingSaCaseDetails(result['om_key'], result['team_code']).then(function (results) {
                results.forEach((caseDetail) => { caseDetails.push(caseDetail) })
                omWorkloads.push(new OmWorkload(
                  stagingId, casesSummary, courtReport, institutionalReport, caseDetails
                ))
              })
            })
          })
        })
          .then(function () {
            return omWorkloads
          })
      }
    })
}

const knexConfig = require('../../../knexfile').staging
const knex = require('knex')(knexConfig)
const OmWorkload = require('wmt-probation-rules').OmWorkload
const CasesSummary = require('wmt-probation-rules').CasesSummary
const CourtReport = require('wmt-probation-rules').CourtReport
const InstitutionalReport = require('wmt-probation-rules').InstitutionalReport
const Tiers = require('wmt-probation-rules').Tiers
const locations = require('wmt-probation-rules').Locations
const getStagingCaseDetails = require('../data/get-staging-case-details')
const Promise = require('bluebird').Promise

module.exports = function (range) {
  var omWorkloads = []
  return knex('wmt_extract').whereBetween('wmt_extract.id', range)
    .leftJoin('court_reports', 'wmt_extract.om_key', 'court_reports.om_key')
    .leftJoin('inst_reports', 'wmt_extract.om_key', 'inst_reports.om_key')
    .select('wmt_extract.trust', 'wmt_extract.region_desc', 'wmt_extract.region_code',
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
      'wmt_extract.custtiera', 'court_reports.om_team_staff_grade', 'court_reports.sdr_last_30', 'court_reports.sdr_due_next_30',
      'court_reports.sdr_conv_last_30', 'inst_reports.parom_due_next_30', 'inst_reports.parom_comp_last_30')
    .then(function (results) {
      if (results !== 'undefined' && results.length > 0) {
        return Promise.each(results, function (result) {
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
            result['comIn1st16Weeks'],
            result['licIn1st16Weeks'],
            result['datestamp']
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
          return getStagingCaseDetails(result['om_key']).then(function (caseDetails) {
            omWorkloads.push(new OmWorkload(
                casesSummary, courtReport, institutionalReport, caseDetails
            ))
          })
        })
        .then(function () {
          return omWorkloads
        })
      }
    })
}

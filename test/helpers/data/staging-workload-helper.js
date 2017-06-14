const knexConfig = require('../../../knexfile').staging
const knex = require('knex')(knexConfig)
const stagingHelper = require('wmt-probation-rules').stagingTestHelper

const aliases = {
  caseRefNo: 'case_ref_no',
  location: 'location',
  omKey: 'om_key',
  rowType: 'row_type',
  tierCode: 'tier_code',
  omTeamStaffGrade: 'om_team_staff_grade',
  sdrLast30: 'sdr_last_30',
  sdrDueNext30: 'sdr_due_next_30',
  sdrConvLast30: 'sdr_conv_last_30',
  paromDueNext30: 'parom_due_next_30',
  paromCompLast30: 'parom_comp_last_30',
  trust: 'trust',
  regionDesc: 'region_desc',
  regionCode: 'region_code',
  lduDesc: 'ldu_desc',
  lduCode: 'ldu_code',
  teamDesc: 'team_desc',
  teamCode: 'team_code',
  omSurname: 'om_surname',
  omForename: 'om_forename',
  omGradeCode: 'om_grade_code',
  comIn1st16Weeks: 'comin1st16weeks',
  licIn1st16Weeks: 'licin1st16weeks',
  datestamp: 'datestamp',
  commtier0: 'commtier0',
  commtierd2: 'commtierd2',
  commtierd1: 'commtierd1',
  commtierc2: 'commtierc2',
  commtierc1: 'commtierc1',
  commtierb2: 'commtierb2',
  commtierb1: 'commtierb1',
  commtiera: 'commtiera',
  licencetier0: 'licencetier0',
  licencetierd2: 'licencetierd2',
  licencetierd1: 'licencetierd1',
  licencetierc2: 'licencetierc2',
  licencetierc1: 'licencetierc1',
  licencetierb2: 'licencetierb2',
  licencetierb1: 'licencetierb1',
  licencetiera: 'licencetiera',
  custtier0: 'custtier0',
  custtierd2: 'custtierd2',
  custtierd1: 'custtierd1',
  custtierc2: 'custtierc2',
  custtierc1: 'custtierc1',
  custtierb2: 'custtierb2',
  custtierb1: 'custtierb1',
  custtiera: 'custtiera'
}

const wmtExtractTable = 'wmt_extract'
const courtReportsTable = 'court_reports'
const institutionalReportsTable = 'inst_reports'

const testOmKey = 'l102A'
// Create a test CaseDetails object, mapping properties to column names

module.exports.getTestCaseSummary = function (omKey = testOmKey) {
  return stagingHelper.getTestCaseSummary(omKey)
}

module.exports.getTestCourtReport = function (omKey = testOmKey) {
  return stagingHelper.getTestCourtReport(omKey)
}

module.exports.getTestInstitutionalReport = function (omKey = testOmKey) {
  return stagingHelper.getTestInstitutionalReport(omKey)
}

const caseSummary = module.exports.getTestCaseSummary(testOmKey)
const courtReport = module.exports.getTestCourtReport(testOmKey)
const institutionalReport = module.exports.getTestInstitutionalReport(testOmKey)

module.exports.insertCaseSummaryReport = function () {
  return knex(wmtExtractTable)
    .insert(mapForInsert(caseSummary))
    .then(function () {
      return caseSummary
    })
}

module.exports.insertCourtReport = function () {
  return knex(courtReportsTable)
    .insert(mapForInsert(courtReport))
    .then(function () {
      return courtReport
    })
}

module.exports.insertInstitutionalReport = function () {
  return knex(institutionalReportsTable)
    .insert(mapForInsert(institutionalReport))
    .then(function () {
      return institutionalReport
    })
}

module.exports.deleteAll = function () {
  return knex(institutionalReportsTable).del()
    .then(function () {
      return knex(courtReportsTable).del()
        .then(function () {
          return knex(wmtExtractTable).del()
        })
    })
}

function mapForInsert (record) {
  var row = {}
  for (let key in record) {
    if (key === 'communityTiers') {
      for (let subkey in record[key]) {
        let alias = subkey === 'untiered' ? '0' : subkey
        if (typeof aliases['commtier' + alias] !== 'undefined') {
          row[aliases['commtier' + alias]] = record[key][subkey]
        }
      }
    } else if (key === 'licenseTiers') {
      for (let subkey in record[key]) {
        let alias = subkey === 'untiered' ? '0' : subkey
        if (typeof aliases['licencetier' + alias] !== 'undefined') {
          row[aliases['licencetier' + alias]] = record[key][subkey]
        }
      }
    } else if (key === 'custodyTiers') {
      for (let subkey in record[key]) {
        let alias = subkey === 'untiered' ? '0' : subkey
        if (typeof aliases['custtier' + alias] !== 'undefined') {
          row[aliases['custtier' + alias]] = record[key][subkey]
        }
      }
    } else {
      if (typeof aliases[key] !== 'undefined') {
        row[aliases[key]] = record[key]
      }
    }
  }
  return row
}

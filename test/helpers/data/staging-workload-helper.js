const knex = require('../../../knex').stagingSchema
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
  custtiera: 'custtiera',
  assessmentDate: 'assessment_date',
  assessmentCode: 'assessment_code',
  assessmentDescription: 'assessment_desc',
  assessmentStaffName: 'assessment_staff_name',
  assessmentStaffKey: 'assessment_staff_key',
  assessmentStaffGrade: 'assessment_staff_grade',
  assessmentTeamKey: 'assessmentent_team_key',
  assessmentProviderCode: 'assessment_provider_code',
  crn: 'crn',
  disposalOrReleaseDate: 'disposal_or_release_date',
  sentenceType: 'sentence_type',
  soRegistrationDate: 'so_registration_date'
}

const wmtExtractTable = 'wmt_extract'
const courtReportsTable = 'court_reports'
const institutionalReportsTable = 'inst_reports'
const armsTable = 'arms'
const t2aTable = 't2a'

const testOmKey = 'l102A'
const testTeamCode = 'KNS'
// Create a test CaseDetails object, mapping properties to column names

module.exports.getTestCaseSummary = function (omKey = testOmKey) {
  return stagingHelper.getTestCaseSummary(omKey)
}

module.exports.getTestCourtReport = function (omKey = testOmKey, teamCode = testTeamCode) {
  return stagingHelper.getTestCourtReport(omKey, undefined, teamCode)
}

module.exports.getTestInstitutionalReport = function (omKey = testOmKey) {
  return stagingHelper.getTestInstitutionalReport(omKey)
}

module.exports.getArmsData = function (omKey = testOmKey, teamCode = testTeamCode) {
  var defaultArmsObject = {
    assessmentDate: '09/10/2017',
    assessmentCode: 'acode',
    assessmentDescription: 'A description',
    assessmentStaffName: 'A name',
    assessmentStaffKey: omKey,
    assessmentStaffGrade: 'C',
    assessmentTeamKey: teamCode,
    assessmentProviderCode: 'providerCode',
    crn: '123456',
    disposalOrReleaseDate: '09/10/2017',
    sentenceType: 'License',
    soRegistrationDate: '09/10/2017'
  }

  return [
    Object.assign({}, defaultArmsObject),
    Object.assign({}, defaultArmsObject),
    Object.assign({}, defaultArmsObject, { sentenceType: 'Community' }),
    Object.assign({}, defaultArmsObject, { sentenceType: 'Community' }),
    Object.assign({}, defaultArmsObject, { sentenceType: 'Community' })
  ]
}

module.exports.insertT2aCaseSummaryReport = function (caseSummary, inserts) {
  return knex(t2aTable)
    .insert(mapT2aForInsert(caseSummary))
    .returning('id')
    .then(function (id) {
      inserts.push({ table: t2aTable, id: id })
      return inserts
    })
}

module.exports.insertCaseSummaryReport = function (caseSummary, inserts) {
  return knex(wmtExtractTable)
    .insert(mapForInsert(caseSummary))
    .returning('id')
    .then(function (id) {
      inserts.push({ table: wmtExtractTable, id: id })
      return inserts
    })
}

module.exports.insertCourtReport = function (courtReport, inserts) {
  var courtReportToInsert = Object.assign({}, courtReport, { teamCode: testTeamCode })
  return knex(courtReportsTable)
    .insert(mapForInsert(courtReportToInsert))
    .returning('id')
    .then(function (id) {
      inserts.push({ table: courtReportsTable, id: id })
      return inserts
    })
}

module.exports.insertInstitutionalReport = function (institutionalReport, inserts) {
  var instReportToInsert = Object.assign({}, institutionalReport, { teamCode: testTeamCode })
  return knex(institutionalReportsTable)
    .insert(mapForInsert(instReportToInsert))
    .returning('id')
    .then(function (id) {
      inserts.push({ table: institutionalReportsTable, id: id })
      return inserts
    })
}

module.exports.insertArms = function (arms, inserts) {
  return knex(armsTable)
    .insert(arms.map(mapForInsert))
    .returning('id')
    .then(function (id) {
      inserts.push({ table: armsTable, id: id })
      return inserts
    })
}

module.exports.deleteAll = function () {
  return knex(institutionalReportsTable).del()
    .then(function () {
      return knex(courtReportsTable).del()
        .then(function () {
          return knex(t2aTable).del()
          .then(function () {
            return knex(wmtExtractTable).del()
          })
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

function mapT2aForInsert (record) {
  var row = {}
  for (let key in record) {
    if (key === 't2aCommunityTiers') {
      for (let subkey in record[key]) {
        let alias = subkey === 'untiered' ? '0' : subkey
        if (typeof aliases['commtier' + alias] !== 'undefined') {
          row[aliases['commtier' + alias]] = record[key][subkey]
        }
      }
    } else if (key === 't2aLicenseTiers') {
      for (let subkey in record[key]) {
        let alias = subkey === 'untiered' ? '0' : subkey
        if (typeof aliases['licencetier' + alias] !== 'undefined') {
          row[aliases['licencetier' + alias]] = record[key][subkey]
        }
      }
    } else if (key === 't2aCustodyTiers') {
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

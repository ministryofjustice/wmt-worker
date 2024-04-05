const knex = require('../../../knex').stagingSchema
const stagingHelper = require('./staging-helper')

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
  oralReports: 'oral_reports',
  paromDueNext30: 'parom_due_next_30',
  paromCompLast30: 'parom_comp_last_30',
  trust: 'trust',
  regionDesc: 'region_desc',
  regionCode: 'region_code',
  lduDesc: 'pdu_desc',
  lduCode: 'pdu_code',
  teamDesc: 'team_desc',
  teamCode: 'team_code',
  omSurname: 'om_surname',
  omForename: 'om_forename',
  omGradeCode: 'om_grade_code',
  comIn1st16Weeks: 'comin1st16weeks',
  licIn1st16Weeks: 'licin1st16weeks',
  datestamp: 'datestamp',
  commtier0: 'commtier0',
  commtiera3: 'commtiera3',
  commtiera2: 'commtiera2',
  commtiera1: 'commtiera1',
  commtiera0: 'commtiera0',
  commtierb3: 'commtierb3',
  commtierb2: 'commtierb2',
  commtierb1: 'commtierb1',
  commtierb0: 'commtierb0',
  commtierc3: 'commtierc3',
  commtierc2: 'commtierc2',
  commtierc1: 'commtierc1',
  commtierc0: 'commtierc0',
  commtierd3: 'commtierd3',
  commtierd2: 'commtierd2',
  commtierd1: 'commtierd1',
  commtierd0: 'commtierd0',
  licencetier0: 'licencetier0',
  licencetiera3: 'licencetiera3',
  licencetiera2: 'licencetiera2',
  licencetiera1: 'licencetiera1',
  licencetiera0: 'licencetiera0',
  licencetierb3: 'licencetierb3',
  licencetierb2: 'licencetierb2',
  licencetierb1: 'licencetierb1',
  licencetierb0: 'licencetierb0',
  licencetierc3: 'licencetierc3',
  licencetierc2: 'licencetierc2',
  licencetierc1: 'licencetierc1',
  licencetierc0: 'licencetierc0',
  licencetierd3: 'licencetierd3',
  licencetierd2: 'licencetierd2',
  licencetierd1: 'licencetierd1',
  licencetierd0: 'licencetierd0',
  custtier0: 'custtier0',
  custtiera3: 'custtiera3',
  custtiera2: 'custtiera2',
  custtiera1: 'custtiera1',
  custtiera0: 'custtiera0',
  custtierb3: 'custtierb3',
  custtierb2: 'custtierb2',
  custtierb1: 'custtierb1',
  custtierb0: 'custtierb0',
  custtierc3: 'custtierc3',
  custtierc2: 'custtierc2',
  custtierc1: 'custtierc1',
  custtierc0: 'custtierc0',
  custtierd3: 'custtierd3',
  custtierd2: 'custtierd2',
  custtierd1: 'custtierd1',
  custtierd0: 'custtierd0',

  commtiera3s: 'commtiera3s',
  commtiera2s: 'commtiera2s',
  commtiera1s: 'commtiera1s',
  commtiera0s: 'commtiera0s',
  commtierb3s: 'commtierb3s',
  commtierb2s: 'commtierb2s',
  commtierb1s: 'commtierb1s',
  commtierb0s: 'commtierb0s',
  commtierc3s: 'commtierc3s',
  commtierc2s: 'commtierc2s',
  commtierc1s: 'commtierc1s',
  commtierc0s: 'commtierc0s',
  commtierd3s: 'commtierd3s',
  commtierd2s: 'commtierd2s',
  commtierd1s: 'commtierd1s',
  commtierd0s: 'commtierd0s',

  licencetiera3s: 'licencetiera3s',
  licencetiera2s: 'licencetiera2s',
  licencetiera1s: 'licencetiera1s',
  licencetiera0s: 'licencetiera0s',
  licencetierb3s: 'licencetierb3s',
  licencetierb2s: 'licencetierb2s',
  licencetierb1s: 'licencetierb1s',
  licencetierb0s: 'licencetierb0s',
  licencetierc3s: 'licencetierc3s',
  licencetierc2s: 'licencetierc2s',
  licencetierc1s: 'licencetierc1s',
  licencetierc0s: 'licencetierc0s',
  licencetierd3s: 'licencetierd3s',
  licencetierd2s: 'licencetierd2s',
  licencetierd1s: 'licencetierd1s',
  licencetierd0s: 'licencetierd0s',

  custtiera3s: 'custtiera3s',
  custtiera2s: 'custtiera2s',
  custtiera1s: 'custtiera1s',
  custtiera0s: 'custtiera0s',
  custtierb3s: 'custtierb3s',
  custtierb2s: 'custtierb2s',
  custtierb1s: 'custtierb1s',
  custtierb0s: 'custtierb0s',
  custtierc3s: 'custtierc3s',
  custtierc2s: 'custtierc2s',
  custtierc1s: 'custtierc1s',
  custtierc0s: 'custtierc0s',
  custtierd3s: 'custtierd3s',
  custtierd2s: 'custtierd2s',
  custtierd1s: 'custtierd1s',
  custtierd0s: 'custtierd0s',
  assessmentDate: 'assessment_date',
  assessmentCode: 'assessment_code',
  assessmentDescription: 'assessment_desc',
  assessmentStaffName: 'assessment_staff_name',
  assessmentStaffKey: 'assessment_staff_key',
  assessmentStaffGrade: 'assessment_staff_grade',
  assessmentTeamKey: 'assessment_team_key',
  assessmentProviderCode: 'assessment_provider_code',
  crn: 'crn',
  disposalOrReleaseDate: 'disposal_or_release_date',
  sentenceType: 'sentence_type',
  soRegistrationDate: 'so_registration_date'
}

const wmtExtractTable = 'wmt_extract'
const wmtExtractFilteredTable = 'wmt_extract_filtered'
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
  const defaultArmsObject = {
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
    sentenceType: 'Licence', // Change to match new extract
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
    .withSchema('staging')
    .insert(mapT2aForInsert(caseSummary))
    .returning('id')
    .then(function ([id]) {
      inserts.push({ table: t2aTable, id: id.id })
      return inserts
    })
}

module.exports.insertFilteredCaseSummaryReport = function (caseSummary, inserts) {
  return knex(wmtExtractFilteredTable)
    .withSchema('staging')
    .insert(mapFilteredForInsert(caseSummary))
    .returning('id')
    .then(function ([id]) {
      inserts.push({ table: wmtExtractFilteredTable, id: id.id })
      return inserts
    })
}

module.exports.insertCaseSummaryReport = function (caseSummary, inserts) {
  return knex(wmtExtractTable)
    .withSchema('staging')
    .insert(mapForInsert(caseSummary))
    .returning('id')
    .then(function ([id]) {
      inserts.push({ table: wmtExtractTable, id: id.id })
      return inserts
    })
}

module.exports.insertCourtReport = function (courtReport, inserts) {
  const courtReportToInsert = Object.assign({}, courtReport, { teamCode: testTeamCode })
  return knex(courtReportsTable)
    .withSchema('staging')
    .insert(mapForInsert(courtReportToInsert))
    .returning('id')
    .then(function ([id]) {
      inserts.push({ table: courtReportsTable, id: id.id })
      return inserts
    })
}

module.exports.insertInstitutionalReport = function (institutionalReport, inserts) {
  const instReportToInsert = Object.assign({}, institutionalReport, { teamCode: testTeamCode })
  return knex(institutionalReportsTable)
    .withSchema('staging')
    .insert(mapForInsert(instReportToInsert))
    .returning('id')
    .then(function ([id]) {
      inserts.push({ table: institutionalReportsTable, id: id.id })
      return inserts
    })
}

module.exports.insertArms = function (arms, inserts) {
  return knex(armsTable)
    .withSchema('staging')
    .insert(arms.map(mapForInsert))
    .returning('id')
    .then(function ([id]) {
      inserts.push({ table: armsTable, id: id.id })
      return inserts
    })
}

function mapForInsert (record) {
  const row = {}
  for (const key in record) {
    if (key === 'communityTiers') {
      for (const subkey in record[key]) {
        const alias = subkey === 'untiered' ? '0' : subkey
        if (typeof aliases['commtier' + alias] !== 'undefined') {
          row[aliases['commtier' + alias]] = record[key][subkey]
        }
      }
    } else if (key === 'licenseTiers') {
      for (const subkey in record[key]) {
        const alias = subkey === 'untiered' ? '0' : subkey
        if (typeof aliases['licencetier' + alias] !== 'undefined') {
          row[aliases['licencetier' + alias]] = record[key][subkey]
        }
      }
    } else if (key === 'custodyTiers') {
      for (const subkey in record[key]) {
        const alias = subkey === 'untiered' ? '0' : subkey
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

function mapFilteredForInsert (record) {
  const row = {}
  for (const key in record) {
    if (key === 'filteredCommunityTiers') {
      for (const subkey in record[key]) {
        const alias = subkey === 'untiered' ? '0' : subkey
        if (typeof aliases['commtier' + alias] !== 'undefined') {
          row[aliases['commtier' + alias]] = record[key][subkey]
        }
      }
    } else if (key === 'filteredLicenseTiers') {
      for (const subkey in record[key]) {
        const alias = subkey === 'untiered' ? '0' : subkey
        if (typeof aliases['licencetier' + alias] !== 'undefined') {
          row[aliases['licencetier' + alias]] = record[key][subkey]
        }
      }
    } else if (key === 'filteredCustodyTiers') {
      for (const subkey in record[key]) {
        const alias = subkey === 'untiered' ? '0' : subkey
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
  const row = {}
  for (const key in record) {
    if (key === 't2aCommunityTiers') {
      for (const subkey in record[key]) {
        const alias = subkey === 'untiered' ? '0' : subkey
        if (typeof aliases['commtier' + alias] !== 'undefined') {
          row[aliases['commtier' + alias]] = record[key][subkey]
        }
      }
    } else if (key === 't2aLicenseTiers') {
      for (const subkey in record[key]) {
        const alias = subkey === 'untiered' ? '0' : subkey
        if (typeof aliases['licencetier' + alias] !== 'undefined') {
          row[aliases['licencetier' + alias]] = record[key][subkey]
        }
      }
    } else if (key === 't2aCustodyTiers') {
      for (const subkey in record[key]) {
        const alias = subkey === 'untiered' ? '0' : subkey
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

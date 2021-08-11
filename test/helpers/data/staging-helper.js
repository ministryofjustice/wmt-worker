const CaseDetails = require('../../../app/services/probation-rules/app/staging/domain/case-details')
const CasesSummary = require('../../../app/services/probation-rules/app/staging/domain/cases-summary')
const CourtReport = require('../../../app/services/probation-rules/app/staging/domain/court-report')
const InstReport = require('../../../app/services/probation-rules/app/staging/domain/institutional-report')
const OmWorkload = require('../../../app/services/probation-rules/app/staging/domain/om-workload')
const OmCourtReports = require('../../../app/services/probation-rules/app/staging/domain/om-court-reports')
const Tiers = require('../../../app/services/probation-rules/app/staging/domain/tiers')
const locations = require('../../../app/services/probation-rules/app/staging/constants/locations')

module.exports.getTestOmWorkload = function (omKey, caseRefNo) {
  const omWorkload = new OmWorkload(
    1,
    this.getTestCaseSummary(omKey),
    this.getTestCourtReport(omKey),
    this.getTestInstitutionalReport(omKey),
    [this.getTestCaseDetails(caseRefNo, omKey, locations.COMMUNITY), this.getTestCaseDetails(caseRefNo, omKey, locations.LICENSE), this.getTestCaseDetails(caseRefNo, omKey, locations.CUSTODY)]
  )
  return omWorkload
}

module.exports.getTestOmCourtReports = function (omKey) {
  const omCourtReports = new OmCourtReports(
    1,
    this.getTestCaseSummary(omKey),
    this.getTestCourtReport(omKey)
  )
  return omCourtReports
}
module.exports.getTestInstitutionalReport = function (omKey, omTeamStaffGrade = 'B', paromDueNext30 = getRandomPoints(), paromCompLast30 = getRandomPoints()) {
  return new InstReport(omKey, omTeamStaffGrade, paromDueNext30, paromCompLast30)
}

module.exports.getTestCourtReport = function (omKey, omTeamStaffGrade = 'B', sdrLast30 = getRandomPoints(), sdrDueNext30 = getRandomPoints(), sdrConvLast30 = getRandomPoints(), oralReports = getRandomPoints()) {
  return new CourtReport(omKey, omTeamStaffGrade, sdrLast30, sdrDueNext30, sdrConvLast30, oralReports)
}

module.exports.getTestCaseDetails = function (omKey, rowType = getRandomRowType(), caseRefNo = this.getGeneratedCaseRefNo(), tierCode = 'A', teamCode = 'W', omGradeCode = 'P', location = locations.COMMUNITY) {
  return new CaseDetails(rowType, caseRefNo, tierCode, teamCode, omGradeCode, omKey, location)
}

module.exports.getMultipleTestCaseDetails = function (omKey, rowType, caseRefNo, tierCode, teamCode, omGradeCode, location, count) {
  const caseDetails = []
  for (let i = 0; i < count; i++) {
    caseDetails.push(this.getTestCaseDetails(omKey, rowType, caseRefNo, tierCode, teamCode, omGradeCode, location))
  }
  return caseDetails
}

module.exports.getTestCaseSummary = function (omKey) {
  const communityTiers = module.exports.getMultipleTestTiers(locations.COMMUNITY)
  const licenseTiers = module.exports.getMultipleTestTiers(locations.LICENSE)
  const custodyTiers = module.exports.getMultipleTestTiers(locations.CUSTODY)

  const t2aCommunityTiers = module.exports.getMultipleTestTiers(locations.COMMUNITY)
  const t2aLicenseTiers = module.exports.getMultipleTestTiers(locations.LICENSE)
  const t2aCustodyTiers = module.exports.getMultipleTestTiers(locations.CUSTODY)

  const filteredCommunityTiers = module.exports.getMultipleTestTiers(locations.COMMUNITY)
  const filteredLicenseTiers = module.exports.getMultipleTestTiers(locations.LICENSE)
  const filteredCustodyTiers = module.exports.getMultipleTestTiers(locations.CUSTODY)

  return new CasesSummary(
    'Trust',
    'Region description',
    getRandomRegionCode(),
    'LDU description',
    'LDU',
    'Team description',
    'KNS',
    'Testing',
    'Tom',
    'Q',
    omKey,
    communityTiers,
    licenseTiers,
    custodyTiers,
    t2aCommunityTiers,
    t2aLicenseTiers,
    t2aCustodyTiers,
    '15',
    '11',
    '13',
    '14',
    filteredCommunityTiers,
    filteredLicenseTiers,
    filteredCustodyTiers
  )
}

module.exports.getGeneratedCaseRefNo = function () {
  const refno = Math.floor(Math.random() * 90000) + 10000
  return `REF-${refno}`
}

module.exports.getMultipleTestTiers = function (location, count) {
  return module.exports.getTestTiers(location)
}

module.exports.getTestTiers = function (location) {
  return new Tiers(location, getRandomPoints(), getRandomPoints(), getRandomPoints(), getRandomPoints(), getRandomPoints(), getRandomPoints(), getRandomPoints(), getRandomPoints(), getRandomPoints(), getRandomPoints(), getRandomPoints(), getRandomPoints(), getRandomPoints(), getRandomPoints(), getRandomPoints(), getRandomPoints(), null)
}

module.exports.getFilteredTiers = function (location) {
  let tiers
  switch (location) {
    case locations.COMMUNITY:
      tiers = new Tiers(location, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16)
      break
    case locations.CUSTODY:
      tiers = new Tiers(location, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36)
      break
    case locations.LICENSE:
      tiers = new Tiers(location, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56)
      break
  }
  return tiers
}

module.exports.getCountableTestTiers = function (location) {
  return new Tiers(location, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1)
}

function getRandomRegionCode () {
  const index = Math.floor(Math.random() * 7) + 1
  return `N${index}`
}

function getRandomPoints () {
  return ((Math.floor(Math.random() * 30) + 10000)).toString()
}

function getRandomRowType () {
  const tierCodes = ['U', 'W', 'O', '']
  return tierCodes[Math.floor(Math.random() * tierCodes.length)]
}

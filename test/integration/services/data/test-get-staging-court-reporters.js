const expect = require('chai').expect
const getStgCourtReporters = require('../../../../app/services/data/get-staging-court-reporters')
const CasesSummay = require('wmt-probation-rules').CasesSummary
const CourtReport = require('wmt-probation-rules').CourtReport
const OmCourtReports = require('wmt-probation-rules').OmCourtReports
const helper = require('../../../helpers/data/staging-court-reporters-helper')

let inserts = []
describe('services/data/get-staging-court-reporters', function () {
  before(function () {
    return helper.insertDependencies(inserts)
      .then(function (builtInserts) {
        inserts = builtInserts
      })
  })

  it('should retrieve any staging court reports in the batch', function () {
    const crId = inserts.filter((item) => item.table === 'court_reporters')[0].id

    const expectCaseSummary = new CasesSummay(
      helper.defaultCourtReporter.trust,
      helper.defaultCourtReporter.region_desc,
      helper.defaultCourtReporter.region_code,
      helper.defaultCourtReporter.pdu_desc,
      helper.defaultCourtReporter.pdu_code,
      helper.defaultCourtReporter.team_desc,
      helper.defaultCourtReporter.team_code,
      helper.defaultCourtReporter.om_surname,
      helper.defaultCourtReporter.om_forename,
      helper.defaultCourtReporter.om_grade_code,
      helper.defaultCourtReporter.om_key,
      null,
      null,
      null,
      null,
      null,
      null,
      null
    )
    const expectedCourtReport = new CourtReport(
      helper.defaultCourtReporter.om_key,
      helper.defaultCourtReporter.om_grade_code,
      helper.defaultCourtReporter.sdr_last_30,
      helper.defaultCourtReporter.sdr_due_next_30,
      helper.defaultCourtReporter.sdr_conv_last_30,
      helper.defaultCourtReporter.oral_reports
    )
    const expectedCourtReports = new OmCourtReports(
      crId,
      expectCaseSummary,
      expectedCourtReport
    )

    return getStgCourtReporters([crId, crId])
      .then(function (results) {
        expect(results).to.be.eql([expectedCourtReports])
      })
  })

  after(function () {
    return helper.removeDependencies(inserts)
  })
})

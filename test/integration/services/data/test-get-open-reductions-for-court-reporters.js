const expect = require('chai').expect
const courtReportsReductionsHelper = require('../../../helpers/data/app-court-reports-reductions-helper')
const getOpenReductionsForCourtReporters = require('../../../../app/services/data/get-open-reductions-for-court-reporters')
const reductionStatus = require('../../../../app/constants/reduction-status')

let inserts = []
let workloadReportId

describe('services/data/get-open-reductions-for-court-reporters', function () {
  before(function () {
    return courtReportsReductionsHelper.insertDependencies(inserts)
      .then(function (builtInserts) {
        inserts = builtInserts
        workloadReportId = inserts.filter((item) => item.table === 'workload_report')[0].id
      })
  })

  it('should retrieve the open reductions in system for a given range of active court reports\' staging ids -> workload owners -> reductions', function () {
    const startStagingId = 1

    return getOpenReductionsForCourtReporters(startStagingId, startStagingId, workloadReportId)
      .then(function (openReductions) {
        expect(openReductions.length).to.be.eql(3)
        openReductions.forEach(function (openReduction) {
          expect([reductionStatus.ACTIVE, reductionStatus.SCHEDULED, null]).to.include(openReduction.status)
          expect(openReduction.forename).to.be.equal('Offender')
          expect(openReduction.surname).to.be.equal('Manager')
          expect(openReduction.teamCode).to.be.equal('TEAM1')
          expect(openReduction.lduCode).to.be.equal('LDU1')
          expect(openReduction.regionCode).to.be.equal('RG1')
          expect(openReduction.reason).to.be.equal('Disability')
          expect(openReduction.additionalNotes).to.be.equal('Some Notes')
        })
      })
  })

  after(function () {
    return courtReportsReductionsHelper.removeDependencies(inserts)
  })
})

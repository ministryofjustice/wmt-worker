const expect = require('chai').expect
const appReductionsHelper = require('../../../helpers/data/app-reductions-helper')
const getOpenReductions = require('../../../../app/services/data/get-open-reductions')

let inserts = []
let workloadReportId

describe('services/data/get-open-reductions', function () {
  before(function () {
    return appReductionsHelper.insertDependencies(inserts)
      .then(function (builtInserts) {
        inserts = builtInserts
        workloadReportId = inserts.filter((item) => item.table === 'workload_report')[0].id
      })
  })

  it('should retrieve the open reductions in system for a given range of active workload staging ids -> workload owners -> reductions', function () {
    const startStagingId = 1
    return getOpenReductions(startStagingId, startStagingId, workloadReportId)
      .then(function (results) {
        expect(results.length).to.be.eql(3)
        results.forEach(function (result) {
          expect(['ACTIVE', 'SCHEDULED', null]).to.include(result.status)
          expect(result.forename).to.be.equal('Offender')
          expect(result.surname).to.be.equal('Manager')
          expect(result.teamCode).to.be.equal('TEAM1')
          expect(result.lduCode).to.be.equal('LDU1')
          expect(result.regionCode).to.be.equal('RG1')
          expect(result.reason).to.be.equal('Disability')
          expect(result.additionalNotes).to.be.equal('Some Notes')
        })
      })
  })

  after(function () {
    return appReductionsHelper.removeDependencies(inserts)
  })
})

const expect = require('chai').expect
const appReductionsHelper = require('../../../helpers/data/app-reductions-helper')
const getOpenReductions = require('../../../../app/services/data/get-open-reductions')

let inserts = []
let workloadReportId

describe('services/data/get-open-reductions', function () {
  before(function (done) {
    appReductionsHelper.insertDependencies(inserts)
      .then(function (builtInserts) {
        inserts = builtInserts
        workloadReportId = inserts.filter((item) => item.table === 'workload_report')[0].id
        done()
      })
  })

  it('should retrieve the open reductions in system for a given range of active workload staging ids -> workload owners -> reductions', function () {
    const startStagingId = 1
    return getOpenReductions(startStagingId, startStagingId, workloadReportId)
      .then(function (results) {
        expect(results.length).to.be.eql(3)
        const openIds = []
        results.forEach(function (result) {
          expect(['ACTIVE', 'SCHEDULED', null]).to.include(result.status)
          openIds.push(result.id)
        })
      })
  })

  after(function (done) {
    appReductionsHelper.removeDependencies(inserts)
      .then(() => done())
  })
})

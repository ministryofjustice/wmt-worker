const expect = require('chai').expect
const appAdjustmentsHelper = require('../../../helpers/data/app-adjustments-helper')
const getOpenAdjustments = require('../../../../app/services/data/get-open-adjustments')

let inserts = []
let workloadReportId

describe('services/data/get-open-adjustments', function () {
  before(function (done) {
    appAdjustmentsHelper.insertDependencies(inserts)
      .then(function (builtInserts) {
        inserts = builtInserts
        workloadReportId = inserts.filter((item) => item.table === 'workload_report')[0].id
        done()
      })
  })

  it('should retrieve the open adjustments in system for a given range of active workload staging ids -> workload owners -> adjustments', function () {
    const startStagingId = 1
    return getOpenAdjustments(startStagingId, startStagingId, workloadReportId)
      .then(function (results) {
        expect(results.length).to.be.eql(7)
        const openIds = []
        results.forEach(function (result) {
          expect(['ACTIVE', 'SCHEDULED', null]).to.include(result.status)
          openIds.push(result.id)
        })
      })
  })

  after(function (done) {
    appAdjustmentsHelper.removeDependencies(inserts)
      .then(() => done())
  })
})

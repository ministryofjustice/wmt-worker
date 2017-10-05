const expect = require('chai').expect
const appAdjustmentsHelper = require('../../../helpers/data/app-adjustments-helper')
const getOpenReductions = require('../../../../app/services/data/get-open-adjustments')

var inserts = []

describe('services/data/get-open-adjustments', function () {
  before(function () {
    return appAdjustmentsHelper.insertDependencies(inserts)
    .then(function (builtInserts) {
      inserts = builtInserts
    })
  })

  it('should retrieve the open adjustments in system for a given range of workloads -> workload owners -> adjustments', function () {
    var startId = inserts.filter((item) => item.table === 'workload')[0].id
    return getOpenReductions(startId, startId)
    .then(function (results) {
      expect(results.length).to.be.eql(6)
      var openIds = []
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

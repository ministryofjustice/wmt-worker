const expect = require('chai').expect
const appAdjustmentsHelper = require('../../../helpers/data/app-adjustments-helper')
const appWorkloadHelper = require('../../../helpers/data/app-workload-helper')
const getOpenAdjustments = require('../../../../app/services/data/get-open-adjustments')

var inserts = []
var maxStagingId

describe('services/data/get-open-adjustments', function () {
  before(function (done) {
    appAdjustmentsHelper.insertDependencies(inserts)
    .then(function (builtInserts) {
      inserts = builtInserts
      maxStagingId = appWorkloadHelper.maxStagingId
      done()
    })
  })

  it('should retrieve the open adjustments in system for a given range of workload staging ids -> workload owners -> adjustments', function () {
    var startStagingId = maxStagingId + 1
    return getOpenAdjustments(startStagingId, startStagingId)
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

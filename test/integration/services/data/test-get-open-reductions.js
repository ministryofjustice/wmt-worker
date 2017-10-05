const expect = require('chai').expect
const appReductionsHelper = require('../../../helpers/data/app-reductions-helper')
const appWorkloadHelper = require('../../../helpers/data/app-workload-helper')
const getOpenReductions = require('../../../../app/services/data/get-open-reductions')

var inserts = []
var maxStagingId

describe('services/data/get-open-reductions', function () {
  before(function (done) {
    appReductionsHelper.insertDependencies(inserts)
    .then(function (builtInserts) {
      inserts = builtInserts
      maxStagingId = appWorkloadHelper.maxStagingId
      done()
    })
  })

  it('should retrieve the open reductions in system for a given range of workload staging ids -> workload owners -> reductions', function () {
    var startStagingId = maxStagingId + 1
    return getOpenReductions(startStagingId, startStagingId)
    .then(function (results) {
      expect(results.length).to.be.eql(3)
      var openIds = []
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

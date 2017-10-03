const expect = require('chai').expect
const appReductionsHelper = require('../../../helpers/data/app-reductions-helper')
const getOpenReductions = require('../../../../app/services/data/get-open-reductions')

var inserts = []

describe('services/data/get-open-reductions', function () {
  before(function () {
    return appReductionsHelper.insertDependencies(inserts)
    .then(function (builtInserts) {
      inserts = builtInserts
    })
  })

  it('should retrieve the open reductions in system for a given range of workloads -> workload owners -> reductions', function () {
    var startId = inserts.filter((item) => item.table === 'workload')[0].id
    return getOpenReductions(startId, startId)
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

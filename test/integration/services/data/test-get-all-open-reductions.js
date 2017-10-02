const expect = require('chai').expect
const appReductionsHelper = require('../../../helpers/data/app-reductions-helper')
const getAllOpenReductions = require('../../../../app/services/data/get-all-open-reductions')

var inserts = []

describe('services/data/get-all-open-reductions', function () {
  before(function () {
    return appReductionsHelper.insertDependencies(inserts)
    .then(function (builtInserts) {
      inserts = builtInserts
    })
  })

  it('should retrieve the open reductions in system', function () {
    var startId = inserts.filter((item) => item.table === 'workload')[0].id
    return getAllOpenReductions(startId, startId)
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

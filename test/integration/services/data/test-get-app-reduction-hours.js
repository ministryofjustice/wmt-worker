const expect = require('chai').expect

const getAppReductions = require('../../../../app/services/data/get-app-reduction-hours')
const appReductionsHelper = require('../../../helpers/data/app-reductions-helper')
const reductionContactType = require('../../../../app/constants/reduction-contact-type')

var inserts = []

describe('services/data/get-app-reduction-hours', function () {
  before(function (done) {
    appReductionsHelper.insertDependencies(inserts)
    .then(function (builtInserts) {
      inserts = builtInserts
      done()
    })
  })

  it('should retrieve the total of active CMS reductions for a given workload owner', function (done) {
    var workloadOwnerId = inserts.filter((item) => item.table === 'workload_owner')[0].id
    getAppReductions(workloadOwnerId, reductionContactType.CMS).then(function (hours) {
      expect(hours).to.equal(10)
      done()
    })
  })

  it('should retrieve the total of active GS reductions for a given workload owner', function (done) {
    var workloadOwnerId = inserts.filter((item) => item.table === 'workload_owner')[0].id
    getAppReductions(workloadOwnerId, reductionContactType.GS).then(function (hours) {
      expect(hours).to.equal(5)
      done()
    })
  })

  // TODO possibly also include regular reductions? - waiting to hear back from Tom

  after(function (done) {
    appReductionsHelper.removeDependencies(inserts)
      .then(() => done())
  })
})

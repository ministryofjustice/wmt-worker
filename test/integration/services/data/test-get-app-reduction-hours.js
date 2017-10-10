const expect = require('chai').expect

const getAppReductions = require('../../../../app/services/data/get-app-reduction-hours')
const appReductionsHelper = require('../../../helpers/data/app-reductions-helper')

var inserts = []

describe('services/data/get-app-reduction-hours', function () {
  before(function (done) {
    appReductionsHelper.insertDependencies(inserts)
    .then(function (builtInserts) {
      inserts = builtInserts
      done()
    })
  })

  it('should retrieve the total of active reductions for a given workload owner', function (done) {
    var workloadOwnerId = inserts.filter((item) => item.table === 'workload_owner')[0].id
    getAppReductions(workloadOwnerId).then(function (hours) {
      expect(hours).to.equal(9)
      done()
    })
  })

  after(function (done) {
    appReductionsHelper.removeDependencies(inserts)
      .then(() => done())
  })
})

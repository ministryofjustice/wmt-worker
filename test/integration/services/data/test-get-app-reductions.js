const expect = require('chai').expect

const appWorkloadOwnerHelper = require('../../../helpers/data/app-workload-owner-helper')
const appReductionsHelper = require('../../../helpers/data/app-reductions-helper')

const getAppReductions = require('../../../../app/services/data/get-app-reductions')

var inserts = []

describe('services/data/get-app-reductions', function () {
  before(function (done) {
    appWorkloadOwnerHelper.insertDependencies(inserts)
      .then(function (builtInserts) {
        return appReductionsHelper.insertDependencies(inserts)
        .then(function (builtInserts) {
          inserts = builtInserts
          done()
        })
      })
  })

  it('should retrieve the total of reductions for a given workload owner', function (done) {
    var workloadOwnerId = inserts.filter((item) => item.table === 'workload_owner')[0].id
    getAppReductions(workloadOwnerId).then(function (hours) {
      expect(hours).to.equal(38)
      done()
    })
  })

  after(function (done) {
    appReductionsHelper.removeDependencies(inserts)
      .then(() => done())
  })
})

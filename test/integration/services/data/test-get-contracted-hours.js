const expect = require('chai').expect

const appWorkloadOwnerHelper = require('../../../helpers/data/app-workload-owner-helper')
const getContractedHours = require('../../../../app/services/data/get-contracted-hours')

let inserts = []

describe('services/data/get-contracted-hours', function () {
  before(function (done) {
    appWorkloadOwnerHelper.insertDependencies(inserts)
      .then(function (builtInserts) {
        inserts = builtInserts
        done()
      })
  })

  it('should retrieve the contracted hours for a workload owner with specified contracted hours', function () {
    const workloadOwnerId = inserts.filter((item) => item.table === 'workload_owner')[0].id
    return getContractedHours(workloadOwnerId).then(function (hours) {
      expect(hours).to.equal(40)
    })
  })

  after(function (done) {
    appWorkloadOwnerHelper.removeDependencies(inserts)
      .then(() => done())
  })
})

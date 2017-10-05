const expect = require('chai').expect

const helper = require('../../../helpers/data/app-workload-helper')
const getWorkloadOwnerInWorkloadRange = require('../../../../app/services/data/get-workload-owners-in-workload-range')

var inserts = []
var initialWorkloadStagingId

describe('services/data/get-workload-owners-in-workload-range', function () {
  before(function (done) {
    helper.insertDependencies(inserts)
      .then(function (builtInserts) {
        inserts = builtInserts
        initialWorkloadStagingId = helper.maxStagingId + 1
        done()
      })
  })

  it('should retrieve workload owner ids for workload staging id range', function () {
    return getWorkloadOwnerInWorkloadRange(initialWorkloadStagingId, initialWorkloadStagingId)
    .then(function (results) {
      expect(results.length).to.equal(1)
      expect(results[0]).to.be.a('number')
    })
  })

  after(function () {
    return helper.removeDependencies(inserts)
  })
})

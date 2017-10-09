const expect = require('chai').expect

const helper = require('../../../helpers/data/app-workload-helper')
const getWorkloadOwnerInWorkloadRange = require('../../../../app/services/data/get-workload-owners-in-workload-range')

var inserts = []

describe('services/data/get-workload-owners-in-workload-range', function () {
  before(function () {
    return helper.insertDependencies(inserts)
    .then(function (builtInserts) {
      inserts = builtInserts
    })
  })

  it('should retrieve workload owner ids for workload id range', function () {
    var startId = inserts.filter((item) => item.table === 'workload')[0].id
    return getWorkloadOwnerInWorkloadRange(startId, startId)
    .then(function (results) {
      expect(results.length).to.equal(1)
      expect(results[0]).to.be.a('number')
    })
  })

  after(function () {
    return helper.removeDependencies(inserts)
  })
})

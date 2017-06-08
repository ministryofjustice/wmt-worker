const expect = require('chai').expect

const workloadHelper = require('../../../helpers/data/app-workload-helper')
const getAppWorkloads = require('../../../../app/services/data/app-workload-helper')

var inserts = []
var initialWorkloadId = 0
var numberOfInserts = 0

describe('services/data/get-capacity-for-individual', function () {
  before(function (done) {
    workloadHelper.addWorkloads()
      .then(function (builtInserts) {
        inserts = builtInserts
        done()
      })
  })

  it('should retrieve all the workloads within a given id range', function (done) {
    getAppWorkloads(initialWorkloadId, numberOfInserts)
      .then(function (results) {
        expect(results.length).to.equal(inserts.length)
        // TODO verify actual content of returned results compared to inserts
      })
  })

  after(function (done) {
    workloadHelper.removeWorkloadObjects(inserts)
      .then(() => done())
  })
})

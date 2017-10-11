const expect = require('chai').expect

const helper = require('../../../helpers/data/app-workload-helper')
const getWorkloadOwnerInWorkloadRange = require('../../../../app/services/data/get-workload-owners-in-workload-range')

var inserts = []
var initialWorkloadStagingId
var workloadReportId

describe('services/data/get-workload-owners-in-workload-range', function () {
  before(function (done) {
    helper.insertDependencies(inserts)
      .then(function (builtInserts) {
        inserts = builtInserts
        initialWorkloadStagingId = 1
        workloadReportId = inserts.filter((item) => item.table === 'workload_report')[0].id
        done()
      })
  })

  it('should retrieve workload owner ids for workload staging id range', function () {
    return getWorkloadOwnerInWorkloadRange(initialWorkloadStagingId, initialWorkloadStagingId, workloadReportId)
    .then(function (results) {
      expect(results.length).to.equal(1)
      expect(results[0]).to.be.a('number')
    })
  })

  after(function () {
    return helper.removeDependencies(inserts)
  })
})

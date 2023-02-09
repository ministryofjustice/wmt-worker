const expect = require('chai').expect

const helper = require('../../../helpers/data/app-workload-helper')
const removeIntegrationTestData = require('../../../helpers/data/remove-integration-test-data')
const getWorkloadOwnerInWorkloadRange = require('../../../../app/services/data/get-workload-owners-in-workload-range')

let inserts = []
let initialWorkloadStagingId
let workloadReportId

describe('services/data/get-workload-owners-in-workload-range', function () {
  before(function () {
    return helper.insertDependencies(inserts)
      .then(function (builtInserts) {
        inserts = builtInserts
        initialWorkloadStagingId = 1
        workloadReportId = inserts.filter((item) => item.table === 'workload_report')[0].id
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
    return removeIntegrationTestData()
  })
})

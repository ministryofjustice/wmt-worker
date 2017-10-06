const expect = require('chai').expect

const helper = require('../../../helpers/data/app-workload-helper')
const getAppWorkloads = require('../../../../app/services/data/get-app-workloads')

const Workload = require('wmt-probation-rules').Workload

var inserts = []
var initialWorkloadStagingId

describe('services/data/get-app-workloads', function () {
  before(function (done) {
    helper.insertDependencies(inserts)
      .then(function (builtInserts) {
        inserts = builtInserts
        initialWorkloadStagingId = 1
        done()
      })
  })

  it('should retrieve all the workloads with staging ids within a given range', function (done) {
    var batchSize = 2
    var maxStagingId = initialWorkloadStagingId + batchSize - 1
    var workloadOwnerId = inserts.filter((item) => item.table === 'workload_owner')[0].id
    var workloadReportId = inserts.filter((item) => item.table === 'workload_report')[0].id

    getAppWorkloads(initialWorkloadStagingId, maxStagingId, batchSize, workloadReportId)
      .then(function (queryResults) {
        expect(queryResults.length).to.equal(batchSize)
        var firstWorkload = queryResults[0].values
        expect(firstWorkload).to.be.an.instanceof(Workload)
        expect(firstWorkload.workloadOwnerId).to.equal(workloadOwnerId)
        expect(firstWorkload.totalCases).to.equal(20)
        expect(firstWorkload.custodyTiers.total).to.equal(1)
        expect(firstWorkload.communityTiers.total).to.equal(2)
        expect(firstWorkload.licenseTiers.total).to.equal(3)
        expect(firstWorkload.monthlySdrs).to.equal(4)
        expect(firstWorkload.sdrsDueNext30Days).to.equal(5)
        expect(firstWorkload.sdrConversionsLast30Days).to.equal(6)
        expect(firstWorkload.paromsCompletedLast30Days).to.equal(7)
        expect(firstWorkload.paromsDueNext30Days).to.equal(8)

        var secondWorkload = queryResults[1].values
        expect(secondWorkload.totalCases).to.equal(30)
        done()
      })
  })

  it('should retrieve a workload for a given staging id with a batchSize of 1', function (done) {
    var batchSize = 1
    var maxStagingId = initialWorkloadStagingId
    var workloadOwnerId = inserts.filter((item) => item.table === 'workload_owner')[0].id
    var workloadReportId = inserts.filter((item) => item.table === 'workload_report')[0].id

    getAppWorkloads(initialWorkloadStagingId, maxStagingId, batchSize, workloadReportId)
      .then(function (queryResults) {
        expect(queryResults.length).to.equal(batchSize)
        var firstWorkload = queryResults[0].values
        expect(firstWorkload).to.be.an.instanceof(Workload)
        expect(firstWorkload.workloadOwnerId).to.equal(workloadOwnerId)
        expect(firstWorkload.totalCases).to.equal(20)
        expect(firstWorkload.custodyTiers.total).to.equal(1)
        expect(firstWorkload.communityTiers.total).to.equal(2)
        expect(firstWorkload.licenseTiers.total).to.equal(3)
        expect(firstWorkload.monthlySdrs).to.equal(4)
        expect(firstWorkload.sdrsDueNext30Days).to.equal(5)
        expect(firstWorkload.sdrConversionsLast30Days).to.equal(6)
        expect(firstWorkload.paromsCompletedLast30Days).to.equal(7)
        expect(firstWorkload.paromsDueNext30Days).to.equal(8)
        done()
      })
  })

  after(function (done) {
    helper.removeDependencies(inserts)
      .then(() => done())
  })
})

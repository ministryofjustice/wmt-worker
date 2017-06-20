const knexConfig = require('../../../../knexfile').app
const knex = require('knex')(knexConfig)

const expect = require('chai').expect

const helper = require('../../../helpers/data/app-workload-points-calculation-helper')
const calcuatePointsWorker = require('../../../../app/services/workers/calculate-workload-points')
const Batch = require('../../../../app/services/domain/batch')

var inserts = []

describe('services/workers/calculate-workload-points', function () {
  before(function (done) {
    helper.insertDependencies(inserts)
      .then(function (builtInserts) {
        inserts = builtInserts
        done()
      })
  })

  it('creates the expected points calculations', function (done) {
    var workloadReportId = inserts.filter((item) => item.table === 'workload_report')[0].id
    var insertedWorkloads = inserts.filter((item) => item.table === 'workload')
    var initialWorkloadId = insertedWorkloads[0].id
    var batchSize = insertedWorkloads.length

    var task = { additionalData: { workloadBatch: new Batch(initialWorkloadId, batchSize), workloadReportId: workloadReportId } }

    calcuatePointsWorker.execute(task).then(() => {
      knex('workload_points_calculations')
      .whereBetween('workload_id', [initialWorkloadId, (initialWorkloadId + batchSize)])
      .then((workloadPointsCalculations) => {
        expect(workloadPointsCalculations.length).to.equal(batchSize)
        workloadPointsCalculations.forEach((insertedCalculation) =>
                    inserts.push({table: 'workload_points_calculations', id: insertedCalculation.id}))
        done()
      })
    })
  })

  after(function (done) {
    helper.removeDependencies(inserts)
      .then(() => done())
  })
})

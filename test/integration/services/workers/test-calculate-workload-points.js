const knexConfig = require('../../../../knexfile').app
const knex = require('knex')(knexConfig)

const expect = require('chai').expect

const appWorkloadPointsCalculationHelper = require('../../../helpers/data/app-workload-points-calculation-helper')
const appReductionsHelper = require('../../../helpers/data/app-reductions-helper')
const calculatePointsWorker = require('../../../../app/services/workers/calculate-workload-points')
const wpcOperation = require('../../../../app/constants/calculate-workload-points-operation')
const Batch = require('../../../../app/services/domain/batch')

var inserts = []

describe('services/workers/calculate-workload-points', function () {
  before(function (done) {
    appWorkloadPointsCalculationHelper.insertDependencies(inserts)
      .then(function (builtInserts) {
        inserts = builtInserts
      }).then(function () {
        var workloadOwnerId = inserts.filter((item) => item.table === 'workload_owner')
        appReductionsHelper.insertDependencies(workloadOwnerId, inserts)
          .then(function (builtInserts) {
            inserts = builtInserts
            done()
          })
      })
  })

  it('creates the expected points calculations', function (done) {
    var workloadReportId = inserts.filter((item) => item.table === 'workload_report')[0].id
    var insertedWorkloads = inserts.filter((item) => item.table === 'workload')
    var initialWorkloadId = insertedWorkloads[0].id
    var batchSize = insertedWorkloads.length

    var task = {
      additionalData: {
        workloadBatch: new Batch(initialWorkloadId, batchSize),
        operationType: wpcOperation.INSERT
      },
      workloadReportId: workloadReportId }

    calculatePointsWorker.execute(task).then(() => {
      knex('workload_points_calculations')
      .whereBetween('workload_id', [initialWorkloadId, (initialWorkloadId + batchSize - 1)])
      .then((workloadPointsCalculations) => {
        expect(workloadPointsCalculations.length).to.equal(batchSize)
        expect(workloadPointsCalculations[0].reduction_hours).to.equal(38)
        workloadPointsCalculations.forEach((insertedCalculation) =>
          inserts.push({table: 'workload_points_calculations', id: insertedCalculation.id}))
        done()
      })
    })
  })

  after(function (done) {
    appReductionsHelper.removeDependencies(inserts)
      .then(() => done())
  })
})

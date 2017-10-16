const knex = require('../../../../knex').appSchema

const expect = require('chai').expect

const appWorkloadPointsCalculationHelper = require('../../../helpers/data/app-workload-points-calculation-helper')
const appReductionsHelper = require('../../../helpers/data/app-reductions-helper')
const calculatePointsWorker = require('../../../../app/services/workers/calculate-workload-points')
const wpcOperation = require('../../../../app/constants/calculate-workload-points-operation')
const Batch = require('../../../../app/services/domain/batch')

var inserts = []
var initialWorkloadStagingId

describe('services/workers/calculate-workload-points', function () {
  before(function () {
    return appWorkloadPointsCalculationHelper.insertDependencies(inserts)
      .then(function (builtInserts) {
        inserts = builtInserts
        initialWorkloadStagingId = 1
      })
  })

  it('creates the expected points calculations', function () {
    var workloadReportId = inserts.filter((item) => item.table === 'workload_report')[0].id
    var insertedWorkloads = inserts.filter((item) => item.table === 'workload')
    var batchSize = 3

    var task = {
      additionalData: {
        workloadBatch: new Batch(initialWorkloadStagingId, batchSize),
        operationType: wpcOperation.INSERT
      },
      workloadReportId: workloadReportId }

    return calculatePointsWorker.execute(task).then(() => {
      return knex('workload_points_calculations')
      .whereBetween('workload_id', [insertedWorkloads[0].id, insertedWorkloads[insertedWorkloads.length - 1].id])
      .then(function (workloadPointsCalculations) {
        expect(workloadPointsCalculations.length).to.equal(batchSize)
        expect(workloadPointsCalculations[0].workload_report_id).to.equal(workloadReportId)
        expect(workloadPointsCalculations[0].workload_id).to.equal(insertedWorkloads[0].id)
        expect(workloadPointsCalculations[0].contracted_hours).to.equal(40)
        expect(workloadPointsCalculations[0].reduction_hours).to.equal(9)
        expect(workloadPointsCalculations[0].cms_adjustment_points).to.equal(9)
        expect(workloadPointsCalculations[0].gs_adjustment_points).to.equal(4)
        expect(workloadPointsCalculations[0].arms_total_cases).to.equal(23)
        expect(workloadPointsCalculations[1].workload_report_id).to.equal(workloadReportId)
        expect(workloadPointsCalculations[2].workload_report_id).to.equal(workloadReportId)
        workloadPointsCalculations.forEach(function (insertedCalculation) {
          inserts.push({table: 'workload_points_calculations', id: insertedCalculation.id})
        })
      })
    })
  })

  after(function () {
    return appReductionsHelper.removeDependencies(inserts)
  })
})

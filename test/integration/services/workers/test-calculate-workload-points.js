const knex = require('../../../../knex').appSchema

const expect = require('chai').expect

const appWorkloadPointsCalculationHelper = require('../../../helpers/data/app-workload-points-calculation-helper')
const calculatePointsWorker = require('../../../../app/services/workers/calculate-workload-points')
const operationTypes = require('../../../../app/constants/calculation-tasks-operation-type')

const Batch = require('../../../../app/services/domain/batch')

let inserts = []
let initialWorkloadStagingId

describe('services/workers/calculate-workload-points', function () {
  before(function () {
    return appWorkloadPointsCalculationHelper.insertDependencies(inserts)
      .then(function (builtInserts) {
        inserts = builtInserts
        initialWorkloadStagingId = 1
      })
  })

  it('creates the expected points calculations', function () {
    const workloadReportId = inserts.filter((item) => item.table === 'workload_report')[0].id
    const insertedWorkloads = inserts.filter((item) => item.table === 'workload')
    const batchSize = 3

    const task = {
      additionalData: {
        workloadBatch: new Batch(initialWorkloadStagingId, batchSize),
        operationType: operationTypes.INSERT
      },
      workloadReportId: workloadReportId
    }

    return calculatePointsWorker.execute(task).then(() => {
      return knex('workload_points_calculations')
        .withSchema('app')
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
          expect(workloadPointsCalculations[0].total_points).to.equal(30354)
          expect(workloadPointsCalculations[1].workload_report_id).to.equal(workloadReportId)
          expect(workloadPointsCalculations[1].total_points).to.equal(30341)
          expect(workloadPointsCalculations[2].workload_report_id).to.equal(workloadReportId)
          expect(workloadPointsCalculations[2].total_points).to.equal(30341)
          workloadPointsCalculations.forEach(function (insertedCalculation) {
            inserts.push({ table: 'workload_points_calculations', id: insertedCalculation.id })
          })
        })
    })
  })

  after(function () {
    return appWorkloadPointsCalculationHelper.removeDependencies(inserts)
  })
})

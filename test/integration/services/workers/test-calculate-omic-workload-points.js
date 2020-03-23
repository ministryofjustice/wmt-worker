const knex = require('../../../../knex').appSchema

const expect = require('chai').expect

const appOmicWorkloadPointsCalculationHelper = require('../../../helpers/data/app-omic-workload-points-calculation-helper')
const appReductionsHelper = require('../../../helpers/data/app-reductions-helper')
const calculateOmicPointsWorker = require('../../../../app/services/workers/calculate-omic-workload-points')
const operationTypes = require('../../../../app/constants/calculation-tasks-operation-type')

const Batch = require('../../../../app/services/domain/batch')

var inserts = []
var initialWorkloadStagingId

describe('services/workers/calculate-omic-workload-points', function () {
  before(function () {
    return appOmicWorkloadPointsCalculationHelper.insertDependencies(inserts)
      .then(function (builtInserts) {
        inserts = builtInserts
        initialWorkloadStagingId = 1
      })
  })

  it('creates the expected omic points calculations', function () {
    var workloadReportId = inserts.filter((item) => item.table === 'workload_report')[0].id
    var insertedWorkloads = inserts.filter((item) => item.table === 'omic_workload')
    var batchSize = 3

    var task = {
      additionalData: {
        workloadBatch: new Batch(initialWorkloadStagingId, batchSize),
        operationType: operationTypes.INSERT
      },
      workloadReportId: workloadReportId
    }

    return calculateOmicPointsWorker.execute(task).then(() => {
      return knex('omic_workload_points_calculations')
      .whereBetween('omic_workload_id', [insertedWorkloads[0].id, insertedWorkloads[insertedWorkloads.length - 1].id])
      .then(function (workloadPointsCalculations) {
        expect(workloadPointsCalculations.length).to.equal(batchSize)
        expect(workloadPointsCalculations[0].workload_report_id).to.equal(workloadReportId)
        expect(workloadPointsCalculations[0].omic_workload_id).to.equal(insertedWorkloads[0].id)
        expect(workloadPointsCalculations[0].contracted_hours).to.equal(40)
        expect(workloadPointsCalculations[0].arms_total_cases).to.equal(23)
        expect(workloadPointsCalculations[1].workload_report_id).to.equal(workloadReportId)
        expect(workloadPointsCalculations[2].workload_report_id).to.equal(workloadReportId)
        workloadPointsCalculations.forEach(function (insertedCalculation) {
          inserts.push({table: 'omic_workload_points_calculations', id: insertedCalculation.id})
        })
      })
    })
  })

  after(function () {
    return appReductionsHelper.removeDependencies(inserts)
  })
})

const expect = require('chai').expect
const knex = require('../../../../knex').appSchema
const updateWpc = require('../../../../app/services/data/update-workload-points-calculation')
const helper = require('../../../helpers/data/app-workload-points-calculation-helper')
const removeIntegrationTestData = require('../../../helpers/data/remove-integration-test-data')

let inserts = []

describe('app/services/data/update-workload-points-calculation', function () {
  before(function () {
    return helper.insertDependenciesForUpdate(inserts)
      .then(function (builtInserts) {
        inserts = builtInserts
      })
  })

  it('should update the correct workload points calculation record', function () {
    const insertedWorkloadPointsCalculation = inserts.filter((item) => item.table === 'workload_points_calculations')[0]
    const originalWpc = insertedWorkloadPointsCalculation.value
    const workloadId = inserts.filter((item) => item.table === 'workload')[0].id
    const workloadReportId = inserts.filter((item) => item.table === 'workload_report')[0].id
    return updateWpc(
      workloadReportId,
      originalWpc.workload_points_id,
      originalWpc.t2a_workload_points_id,
      workloadId,
      originalWpc.total_points + 1,
      originalWpc.sdr_points + 1,
      originalWpc.sdr_conversion_points + 1,
      originalWpc.nominal_target,
      originalWpc.available_points,
      originalWpc.reduction_hours,
      originalWpc.contracted_hours)
      .then(function () {
        return knex('workload_points_calculations').withSchema('app').where('id', insertedWorkloadPointsCalculation.id).first()
          .then(function (updatedWpc) {
            expect(insertedWorkloadPointsCalculation.id).to.eql(updatedWpc.id)
            expect(originalWpc.workload_report_id).to.eql(updatedWpc.workload_report_id)
            expect(originalWpc.workload_id).to.eql(updatedWpc.workload_id)
            expect(originalWpc.total_points + 1).to.eql(updatedWpc.total_points)
            expect(originalWpc.sdr_points + 1).to.eql(updatedWpc.sdr_points)
            expect(originalWpc.nominal_target).to.eql(updatedWpc.nominal_target)
            expect(originalWpc.last_updated_on).to.not.equal(updateWpc.last_updated_on)
          })
      })
  })

  after(function () {
    return removeIntegrationTestData()
  })
})

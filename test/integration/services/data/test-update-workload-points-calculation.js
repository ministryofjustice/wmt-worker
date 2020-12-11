const expect = require('chai').expect
const knex = require('../../../../knex').appSchema
const updateWpc = require('../../../../app/services/data/update-workload-points-calculation')
const helper = require('../../../helpers/data/app-workload-points-calculation-helper')

let inserts = []

describe('app/services/data/update-workload-points-calculation', function () {
  before(function (done) {
    helper.insertDependenciesForUpdate(inserts)
      .then(function (builtInserts) {
        inserts = builtInserts
        done()
      })
  })

  it('should update the correct workload points calculation record', function () {
    const wpcId = inserts.filter((item) => item.table === 'workload_points_calculations')[0].id
    const workloadId = inserts.filter((item) => item.table === 'workload')[0].id
    const workloadReportId = inserts.filter((item) => item.table === 'workload_report')[0].id

    return knex('workload_points_calculations').where('id', wpcId).first()
      .then(function (originalWpc) {
        return updateWpc(
          workloadReportId,
          originalWpc.workload_points_id,
          originalWpc.t2a_workload_points_id,
          workloadId,
          originalWpc.total_points + 1,
          originalWpc.sdr_points + 1,
          originalWpc.sdr_conversion_points + 1,
          originalWpc.paroms_points,
          originalWpc.nominal_target,
          originalWpc.available_points,
          originalWpc.reduction_hours,
          originalWpc.contracted_hours)
          .then(function () {
            return knex('workload_points_calculations').where('id', originalWpc.id).first()
              .then(function (updatedWpc) {
                expect(originalWpc.id).to.eql(updatedWpc.id)
                expect(originalWpc.workload_report_id).to.eql(updatedWpc.workload_report_id)
                expect(originalWpc.workload_id).to.eql(updatedWpc.workload_id)
                expect(originalWpc.total_points + 1).to.eql(updatedWpc.total_points)
                expect(originalWpc.sdr_points + 1).to.eql(updatedWpc.sdr_points)
                expect(originalWpc.nominal_target).to.eql(updatedWpc.nominal_target)
              })
          })
      })
  })

  after(function (done) {
    helper.removeDependencies(inserts)
      .then(() => done())
  })
})

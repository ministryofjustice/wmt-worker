const knex = require('../../../../knex').appSchema

const expect = require('chai').expect

const helper = require('../../../helpers/data/app-workload-points-calculation-helper')
const insertWorkloadPointsCalculations = require('../../../../app/services/data/insert-workload-points-calculation')
const removeIntegrationTestData = require('../../../helpers/data/remove-integration-test-data')

let inserts = []
/* eslint-disable no-unused-expressions */
describe('services/data/insert-workload-points-calculation', function () {
  before(function (done) {
    helper.insertDependencies(inserts)
      .then(function (builtInserts) {
        inserts = builtInserts
        done()
      })
  })

  it('inserts the workload points calculations with the supplied values', function (done) {
    const workloadReportId = inserts.filter((item) => item.table === 'workload_report')[0].id
    const workloadPointIds = inserts.filter((item) => item.table === 'workload_points')
    const workloadPointsId = workloadPointIds[0].id
    const t2aWorkloadPointsId = workloadPointIds[1].id
    const workloadId = inserts.filter((item) => item.table === 'workload')[0].id
    const totalPoints = 1
    const sdrPoints = 2
    const sdrConversionPoints = 3
    const nominalTarget = 5
    const availablePoints = 6
    const reductionHours = 1.5
    const contractedHours = 38.5
    const cmsAdjustmentPoints = 15

    insertWorkloadPointsCalculations(workloadReportId, workloadPointsId, t2aWorkloadPointsId, workloadId, totalPoints, sdrPoints, sdrConversionPoints,
      nominalTarget, availablePoints, contractedHours, reductionHours, cmsAdjustmentPoints)
      .then(function (ids) {
        const insertedId = ids[0]
        inserts.push({ table: 'workload_points_calculations', id: insertedId })
        knex('workload_points_calculations').withSchema('app').where({ id: insertedId })
          .first()
          .then(function (insertedObject) {
            expect(insertedObject.workload_report_id).to.eql(workloadReportId)
            expect(insertedObject.workload_points_id).to.eql(workloadPointsId)
            expect(insertedObject.t2a_workload_points_id).to.eql(t2aWorkloadPointsId)
            expect(insertedObject.workload_id).to.eql(workloadId)
            expect(insertedObject.total_points).to.eql(totalPoints)
            expect(insertedObject.sdr_points).to.eql(sdrPoints)
            expect(insertedObject.sdr_conversion_points).to.eql(sdrConversionPoints)
            expect(insertedObject.paroms_points).to.eql(0)
            expect(insertedObject.available_points).to.eql(availablePoints)
            expect(insertedObject.reduction_hours).to.eql(reductionHours)
            expect(insertedObject.cms_adjustment_points).to.eql(cmsAdjustmentPoints)
            expect(insertedObject.gs_adjustment_points).to.eql(0)
            expect(insertedObject.contracted_hours).to.eql(contractedHours)
            expect(insertedObject.last_updated_on).to.exist
            done()
          })
      })
  })

  after(function () {
    return removeIntegrationTestData()
  })
})

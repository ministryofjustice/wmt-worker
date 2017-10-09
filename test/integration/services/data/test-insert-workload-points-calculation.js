const knexConfig = require('../../../../knexfile').app
const knex = require('knex')(knexConfig)

const expect = require('chai').expect

const helper = require('../../../helpers/data/app-workload-points-calculation-helper')
const insertWorkloadPointsCalculations = require('../../../../app/services/data/insert-workload-points-calculation')

var inserts = []

describe('services/data/insert-workload-points-calculation', function () {
  before(function (done) {
    helper.insertDependencies(inserts)
      .then(function (builtInserts) {
        inserts = builtInserts
        done()
      })
  })

  it('inserts the workload points calculations with the supplied values', function (done) {
    var workloadReportId = inserts.filter((item) => item.table === 'workload_report')[0].id
    var workloadPointsId = inserts.filter((item) => item.table === 'workload_points')[0].id
    var workloadId = inserts.filter((item) => item.table === 'workload')[0].id
    var totalPoints = 1
    var sdrPoints = 2
    var sdrConversionPoints = 3
    var paromsPoints = 4
    var nominalTarget = 5
    var availablePoints = 6
    var reductionHours = 1.5
    var contractedHours = 38.5
    var reductionHours = 32
    var cmsAdjustmentPoints = 15
    var gsAdjustmentPoints = -1

    insertWorkloadPointsCalculations(workloadReportId, workloadPointsId, workloadId, totalPoints, sdrPoints, sdrConversionPoints, 
      paromsPoints, nominalTarget, availablePoints, contractedHours, reductionHours, cmsAdjustmentPoints, gsAdjustmentPoints)
    .then(function (ids) {
      var insertedId = ids[0]
      inserts.push({table: 'workload_points_calculations', id: insertedId})
      knex('workload_points_calculations').where({id: insertedId})
          .first().then(function (insertedObject) {
            expect(insertedObject.workload_report_id).to.eql(workloadReportId)
            expect(insertedObject.workload_points_id).to.eql(workloadPointsId)
            expect(insertedObject.workload_id).to.eql(workloadId)
            expect(insertedObject.total_points).to.eql(totalPoints)
            expect(insertedObject.sdr_points).to.eql(sdrPoints)
            expect(insertedObject.sdr_conversion_points).to.eql(sdrConversionPoints)
            expect(insertedObject.paroms_points).to.eql(paromsPoints)
            expect(insertedObject.available_points).to.eql(availablePoints)
            expect(insertedObject.reduction_hours).to.eql(reductionHours)
            expect(insertedObject.cms_adjustment_points).to.eql(cmsAdjustmentPoints)
            expect(insertedObject.gs_adjustment_points).to.eql(gsAdjustmentPoints)
            expect(insertedObject.contracted_hours).to.eql(contractedHours)
            done()
          })
    })
  })

  after(function (done) {
    helper.removeDependencies(inserts)
      .then(() => done())
  })
})

const expect = require('chai').expect
const knex = require('../../../../knex').appSchema
const CourtReports = require('wmt-probation-rules').CourtReports
const workloadOwnerHelper = require('../../../helpers/data/app-workload-owner-helper')
const insertAppCourtReports = require('../../../../app/services/data/insert-app-workload')

var workloadOwnerId
var workloadReportId
var inserts = []
describe('app/services/data/insert-app-court-reports', function () {
  before(function (){
    //get woid
    return workloadOwnerHelper.insertDependencies(inserts)
    .then(function (builtInserts) {
      inserts = builtInserts
      workloadOwnerId = inserts.filter((item) => item.table === 'workload_owner')[0].id
      
      return knex('workload_report').insert({effective_from: new Date(), effective_to: null}).returning('id')
      .then(function (insertedId) {
        inserts.push({table: 'workload_report', id: insertedId})
      })
    })
  })
    
  it('should add court reports entry', function () {
    var newEntry = new CourtReports(workloadOwnerId, totalSdrs, totalFdrs, totalOralReports, stagingId, workloadReportId)
   
    return insertAppCourtReports(newEntry)
    .then(function (insertedId) {
      inserts.push({table: 'court-reports', id: insertedId})
      
      var expectedCourtReports = {
        workload_owner_id: workloadOwnerId,
        total_sdrs: totalSdrs,
        total_fdrs: totalFdrs,
        total_oral_reports: totalOralReports,
        staging_id: stagingId,
        workload_report_id: workloadReportId,
        id: insertedId
      }
      return knex('court-reports').select('id', 'workload_owner_id', 'total_sdrs', 'total_fdrs', 'total_oral_reports', 'staging_id', 'workload_report_id')
      .then(function (results) {
        expect(results.includes(expectedCourtReports)).to.be.equal(true)
      })
    })
  })

  after(function () {
    workloadOwnerHelper.removeDependencies(inserts)
  })
})
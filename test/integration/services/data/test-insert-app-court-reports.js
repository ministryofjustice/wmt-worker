const expect = require('chai').expect
const knex = require('../../../../knex').appSchema
const CourtReports = require('../../../../app/services/probation-rules').CourtReports
const workloadOwnerHelper = require('../../../helpers/data/app-workload-owner-helper')
const insertAppCourtReports = require('../../../../app/services/data/insert-app-court-reports')
const removeIntegrationTestData = require('../../../helpers/data/remove-integration-test-data')

let workloadOwnerId
let workloadReportId
const totalSdrs = 1
const totalFdrs = 2
const totalOralReports = 3
const stagingId = 4

let inserts = []
describe('app/services/data/insert-app-court-reports', function () {
  before(function () {
    return workloadOwnerHelper.insertDependencies(inserts)
      .then(function (builtInserts) {
        inserts = builtInserts
        workloadOwnerId = inserts.filter((item) => item.table === 'workload_owner')[0].id

        return knex('workload_report').withSchema('app').insert({ effective_from: new Date(), effective_to: null }).returning('id')
          .then(function (insertedId) {
            inserts.push({ table: 'workload_report', id: insertedId })
            workloadReportId = parseInt(insertedId)
          })
      })
  })

  it('should add court reports entry', function () {
    const newEntry = new CourtReports(workloadOwnerId, totalSdrs, totalFdrs, totalOralReports, stagingId, workloadReportId)

    return insertAppCourtReports(newEntry)
      .then(function (insertedId) {
        inserts.push({ table: 'court_reports', id: insertedId[0] })
        return knex('court_reports').withSchema('app').where('id', insertedId[0])
          .first('id', 'workload_owner_id', 'total_sdrs', 'total_fdrs', 'total_oral_reports', 'staging_id', 'workload_report_id')
          .then(function (results) {
            const expectedCourtReports = {
              id: insertedId[0],
              workload_owner_id: workloadOwnerId,
              total_sdrs: totalSdrs,
              total_fdrs: totalFdrs,
              total_oral_reports: totalOralReports,
              staging_id: stagingId,
              workload_report_id: workloadReportId
            }
            expect(results).to.be.eql(expectedCourtReports)
          })
      })
  })

  after(function () {
    return removeIntegrationTestData()
  })
})

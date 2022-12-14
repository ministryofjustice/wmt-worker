const expect = require('chai').expect
const knex = require('../../../../knex').appSchema

const helper = require('../../../helpers/data/app-court-reports-helper')
const removeIntegrationTestData = require('../../../helpers/data/remove-integration-test-data')
const getAppCourtReports = require('../../../../app/services/data/get-app-court-reports')

let inserts = []

describe('services/data/get-app-court-reports', function () {
  before(function () {
    return helper.insertDependencies(inserts)
      .then(function (builtInserts) {
        inserts = builtInserts
      })
  })

  it('should retrieve all the court-reports with staging ids within a given range and the given workload report id', function () {
    return knex('court_reports').withSchema('app').max('staging_id AS maxId').first()
      .then(function (maxId) {
        const workloadReportId = inserts.find((item) => item.table === 'workload_report').id
        const expectedResults = [{
          id: inserts.find((item) => item.table === 'court_reports').id,
          workloadOwnerId: inserts.find((item) => item.table === 'workload_owner').id
        }]
        return getAppCourtReports(maxId.maxId, maxId.maxId, workloadReportId)
          .then(function (results) {
            expect(results).to.eql(expectedResults)
          })
      })
  })

  after(function () {
    return removeIntegrationTestData()
  })
})

const expect = require('chai').expect
const knex = require('../../../../knex').appSchema

const helper = require('../../../helpers/data/app-court-reports-helper')
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
        return knex('workload_report').withSchema('app').whereNull('effective_to').first('id')
          .then(function (workloadReportId) {
            const expectedResults = [{
              id: inserts.filter((item) => item.table === 'court_reports')[0].id,
              workloadOwnerId: inserts.filter((item) => item.table === 'workload_owner')[0].id
            }]
            return getAppCourtReports(maxId.maxId, maxId.maxId, workloadReportId.id)
              .then(function (results) {
                expect(results).to.eql(expectedResults)
              })
          })
      })
  })

  after(function () {
    return helper.removeDependencies(inserts)
  })
})

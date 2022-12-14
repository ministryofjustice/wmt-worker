const knex = require('../../../../knex').appSchema
const expect = require('chai').expect

const helper = require('../../../helpers/data/app-court-reports-helper')
const removeIntegrationTestData = require('../../../helpers/data/remove-integration-test-data')
const insertCourtReportsCalculations = require('../../../../app/services/data/insert-court-reports-calculation')

let inserts = []

describe('services/data/insert-court-reports-calculation', function () {
  before(function () {
    return helper.insertDependencies(inserts)
      .then(function (builtInserts) {
        inserts = builtInserts
      })
  })

  it('inserts the workload points calculations with the supplied values', function () {
    return knex('workload_points').withSchema('app').first('id')
      .then(function (workloadPointsId) {
        return knex('workload_report').withSchema('app').whereNull('effective_to').first('id')
          .then(function (workloadReportId) {
            return knex('court_reports').withSchema('app').max('id AS id')
              .then(function (courtReportsId) {
                const insertObject = {
                  workloadReportId: workloadReportId.id,
                  workloadPointsId: workloadPointsId.id,
                  courtReportsId: courtReportsId[0].id,
                  contractedHours: 37,
                  reductionHours: 7
                }

                return insertCourtReportsCalculations(insertObject)
                  .then(function (insertedId) {
                    inserts.push({ table: 'court_reports_calculations', id: insertedId[0] })
                    return knex('court_reports_calculations').withSchema('app').where({ id: insertedId[0] }).first()
                      .then(function (result) {
                        const expectedResult = {
                          id: insertedId[0],
                          workload_report_id: insertObject.workloadReportId,
                          workload_points_id: insertObject.workloadPointsId,
                          court_reports_id: insertObject.courtReportsId,
                          contracted_hours: insertObject.contractedHours,
                          reduction_hours: insertObject.reductionHours
                        }
                        expect(result).to.be.eql(expectedResult)
                      })
                  })
              })
          })
      })
  })

  after(function () {
    return removeIntegrationTestData()
  })
})

const knex = require('../../../../knex').appSchema
const expect = require('chai').expect

const helper = require('../../../helpers/data/app-court-reports-helper')
const insertCourtReportsCalculations = require('../../../../app/services/data/insert-court-reports-calculation')
const updateCourtReportsCalculations = require('../../../../app/services/data/update-court-reports-calculation')

let inserts = []

describe('services/data/update-court-reports-calculation', function () {
  before(function () {
    return helper.insertDependencies(inserts)
      .then(function (builtInserts) {
        inserts = builtInserts
      })
  })

  it('updates the workload points calculations with the supplied values', function () {
    return knex('workload_points').first('id')
      .then(function (workloadPointsId) {
        return knex('workload_report').whereNull('effective_to').first('id')
          .then(function (workloadReportId) {
            return knex('court_reports').max('id AS id')
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

                    const updateObject = Object.assign({}, insertObject, { reductionHours: 17 })
                    return updateCourtReportsCalculations(updateObject)
                      .then(function (updatedId) {
                        return knex('court_reports_calculations').where({ id: insertedId[0] }).first()
                          .then(function (result) {
                            const expectedResult = {
                              id: updatedId[0],
                              workload_report_id: updateObject.workloadReportId,
                              workload_points_id: updateObject.workloadPointsId,
                              court_reports_id: updateObject.courtReportsId,
                              contracted_hours: updateObject.contractedHours,
                              reduction_hours: updateObject.reductionHours
                            }
                            expect(result).to.be.eql(expectedResult)
                          })
                      })
                  })
              })
          })
      })
  })

  after(function (done) {
    helper.removeDependencies(inserts)
      .then(() => done())
  })
})

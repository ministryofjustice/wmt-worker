const expect = require('chai').expect
const knex = require('../../../../knex').appSchema
const updateWorkloadReportEffectiveTo = require('../../../../app/services/data/update-workload-report-effective-to')
const helper = require('../../../helpers/data/app-workload-report-helper')

let inserts = []

describe('app/services/data/update-workload-report-effective-to', function () {
  before(function (done) {
    helper.insertDependencies(inserts)
      .then(function (builtInserts) {
        inserts = builtInserts
        done()
      })
  })

  it('should update the correct workload report record, with updated effected_to', function () {
    const workloadReportId = inserts.filter((item) => item.table === 'workload_report')[0].id
    const newEffectiveTo = new Date()

    return knex('workload_report').withSchema('app').where({ id: workloadReportId }).first()
      .then(function (oldWorkloadReport) {
        return updateWorkloadReportEffectiveTo(workloadReportId, newEffectiveTo)
          .then(function () {
            return knex('workload_report').withSchema('app').where({ id: workloadReportId }).first()
              .then(function (updatedWorkloadReport) {
                expect(oldWorkloadReport.id).to.eql(updatedWorkloadReport.id)
                expect(new Date(updatedWorkloadReport.effective_to).getDate()).to.eql(newEffectiveTo.getDate())
                expect(new Date(updatedWorkloadReport.effective_to).getMonth()).to.eql(newEffectiveTo.getMonth())
                expect(new Date(updatedWorkloadReport.effective_to).getFullYear()).to.eql(newEffectiveTo.getFullYear())
              })
          })
      })
  })

  after(function (done) {
    helper.removeDependencies(inserts)
      .then(() => done())
  })
})

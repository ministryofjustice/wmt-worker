const expect = require('chai').expect
const knex = require('../../../../knex').appSchema
const workloadReportStatus = require('../../../../app/constants/workload-report-status')
const updateWorkloadReport = require('../../../../app/services/data/update-workload-report-with-status')
const helper = require('../../../helpers/data/app-workload-report-helper')
const removeIntegrationTestData = require('../../../helpers/data/remove-integration-test-data')

let inserts = []

describe('app/services/data/update-workload-report-with-status', function () {
  before(function () {
    return helper.insertDependencies(inserts)
      .then(function (builtInserts) {
        inserts = builtInserts
      })
  })

  it('should update the correct workload report record, with updated effected_to and status', function () {
    const workloadReportId = inserts.filter((item) => item.table === 'workload_report')[0].id
    const newStatus = workloadReportStatus.FAILED

    return knex('workload_report').withSchema('app').where({ id: workloadReportId }).first().then(function (result) {
      const oldWorkloadReport = result
      updateWorkloadReport(workloadReportId, newStatus).then(function () {
        knex('workload_report').withSchema('app').where({ id: workloadReportId }).first()
          .then(function (updatedWorkloadReport) {
            expect(oldWorkloadReport.id).to.eql(updatedWorkloadReport.id)
            expect(oldWorkloadReport.status).to.not.eql(updatedWorkloadReport.status)
            expect(oldWorkloadReport.status_description).to.not.eql(updatedWorkloadReport.status_description)

            expect(updatedWorkloadReport.status).to.eql(workloadReportStatus.FAILED)
            expect(updatedWorkloadReport.status_description).to.eql(workloadReportStatus.FAILED)
            expect(updatedWorkloadReport.records_total).to.eq(0)
          })
      })
    })
  })

  after(function () {
    return removeIntegrationTestData()
  })
})

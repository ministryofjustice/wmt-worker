const expect = require('chai').expect
const knexConfig = require('../../../../knexfile').app
const knex = require('knex')(knexConfig)
const workloadReportStatus = require('../../../../app/constants/workload-report-status')
const updateWorkloadReport = require('../../../../app/services/data/update-workload-report-with-status')
const helper = require('../../../helpers/data/app-workload-report-helper')
const moment = require('moment')

var inserts = []

describe('app/services/data/update-workload-report-with-status', function () {
  before(function (done) {
    helper.insertDependencies(inserts)
      .then(function (builtInserts) {
        inserts = builtInserts
        done()
      })
  })

  it('should update the correct workload report record, with updated effected_to and status', function (done) {
    var workloadReportId = inserts.filter((item) => item.table === 'workload_report')[0].id
    var newStatus = workloadReportStatus.FAILED

    knex('workload_report').where({id: workloadReportId}).first().then(function (result) {
      var oldWorkloadReport = result
      updateWorkloadReport(workloadReportId, newStatus).then(function () {
        knex('workload_report').where({id: workloadReportId}).first()
        .then(function (updatedWorkloadReport) {
          expect(oldWorkloadReport.id).to.eql(updatedWorkloadReport.id)
          expect(oldWorkloadReport.status).to.not.eql(updatedWorkloadReport.status)
          expect(oldWorkloadReport.status_description).to.not.eql(updatedWorkloadReport.status_description)
          expect(oldWorkloadReport.effective_to).to.not.eql(updatedWorkloadReport.effective_to)

          expect(moment().diff(updatedWorkloadReport['effective_to'], 'seconds')).to.be.lt(10) // eslint-disable-line
          expect(updatedWorkloadReport['status']).to.eql(workloadReportStatus.FAILED)
          expect(updatedWorkloadReport['status_description']).to.eql(workloadReportStatus.FAILED)
          expect(updatedWorkloadReport['records_total']).to.eq(0)
          done()
        })
      })
    })
  })

  after(function (done) {
    helper.removeDependencies(inserts)
      .then(() => done())
  })
})

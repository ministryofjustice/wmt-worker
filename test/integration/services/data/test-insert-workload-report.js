const expect = require('chai').expect
const knexConfig = require('../../../../knexfile').development
const knex = require('knex')(knexConfig)
const config = require('../../../../config')
const workloadReportStatus = require('../../../../app/constants/workload-report-status')
const insertWorkloadReport = require('../../../../app/services/data/insert-workload-report')
const tableName = `${config.DB_APP_SCHEMA}.workload_report`
const moment = require('moment')

var workloadReportId

describe('app/services/data/insert-workload-report', function () {
  it('should insert a new workload report record', function (done) {
    insertWorkloadReport().then(function (id) {
      workloadReportId = id
      return knex.table(tableName)
        .where({'id': id})
        .first()
        .then(function (result) {
          expect(result.status).to.be.equal(workloadReportStatus.PENDING)
          expect(result['status_description']).to.be.null // eslint-disable-line
          expect(result['date_created']).not.to.be.null // eslint-disable-line
          expect(moment().diff(result['effective_from'], 'seconds')).to.be.lt(10) // eslint-disable-line
          expect(result['records_total']).to.eq(0)
          done()
        })
    })
  })

  after(function () {
    return knex(tableName).where('id', workloadReportId).del()
  })
})

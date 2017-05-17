const expect = require('chai').expect
const knexConfig = require('../../../../knexfile').development
const knex = require('knex')(knexConfig)
const config = require('../../../../config')
const workloadReportStatus = require('../../../../app/constants/workload-report-status')
const insertWorkloadReport = require('../../../../app/services/data/insert-workload-report')

describe('app/services/data/insert-workload-report', function () {
  const tableName = `${config.DB_APP_SCHEMA}.workload_report`
  it('should insert a new workload report record', function () {
    insertWorkloadReport().then(function (workloadReportId) {
      return knex.table(tableName)
        .where({'id': workloadReportId})
        .first()
        .then(function (result) {
          expect(result.status).to.be.equal(workloadReportStatus.PENDING)
          expect(result['status_description']).to.be.null // eslint-disable-line
          expect(result['date_created']).not.to.be.null // eslint-disable-line
          expect(result['date_processed']).to.be.null // eslint-disable-line
          expect(result['records_total']).to.be.equal(0)
        })
    })
  })

  after(function () {
    return knex(tableName).del()
  })
})

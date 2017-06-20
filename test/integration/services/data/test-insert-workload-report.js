const expect = require('chai').expect
const knexConfig = require('../../../../knexfile').app
const knex = require('knex')(knexConfig)
const workloadReportStatus = require('../../../../app/constants/workload-report-status')
const insertWorkloadReport = require('../../../../app/services/data/insert-workload-report')
const tableName = 'workload_report'
const moment = require('moment')

var insertedIds = []

describe('app/services/data/insert-workload-report', function () {
  it('should insert return an id', function (done) {
    insertWorkloadReport().then(function (id) {
      insertedIds.push(id)
      expect(id).to.be.a('number')
      done()
    })
  })

  it('should insert a new workload report record', function (done) {
    insertWorkloadReport().then(function (id) {
      insertedIds.push(id)
      return knex.table(tableName)
        .where({'id': id})
        .then(function (results) {
          expect(results.length).to.be.equal(1)
          var result = results[0]
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
    return knex(tableName).whereIn('id', insertedIds).del()
  })
})

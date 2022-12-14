const expect = require('chai').expect
const knex = require('../../../../knex').appSchema
const workloadReportStatus = require('../../../../app/constants/workload-report-status')
const insertWorkloadReport = require('../../../../app/services/data/insert-workload-report')
const removeIntegrationTestData = require('../../../helpers/data/remove-integration-test-data')
const tableName = 'workload_report'
const moment = require('moment')
const timeThreshold = require('../../../constants/time-threshold')

const insertedIds = []

describe('app/services/data/insert-workload-report', function () {
  it('should insert return an workload report', function () {
    return insertWorkloadReport().then(function (id) {
      insertedIds.push(id)
      expect(id).to.be.a('number')
    })
  })

  it('should insert a new workload report record', function () {
    return insertWorkloadReport().then(function (id) {
      insertedIds.push(id)
      return knex.table(tableName)
        .withSchema('app')
        .where({ id })
        .then(function (results) {
          expect(results.length).to.be.equal(1)
          const result = results[0]
          expect(result.status).to.be.equal(workloadReportStatus.INPROGRESS)
          expect(result['status_description']).to.be.null // eslint-disable-line
          expect(result['date_created']).not.to.be.null // eslint-disable-line
          expect(moment().diff(result['effective_from'], 'seconds')).to.be.lt(timeThreshold.INSERT) // eslint-disable-line
          expect(result.records_total).to.eq(0)
        })
    })
  })

  after(function () {
    return removeIntegrationTestData()
  })
})

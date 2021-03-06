const expect = require('chai').expect

const helper = require('../../../helpers/data/app-workload-report-helper')
const getOpenWorkloadReports = require('../../../../app/services/data/get-open-workload-reports')

let inserts = []

describe('services/data/get-open-workload-reports', function () {
  before(function (done) {
    helper.insertDependencies(inserts)
      .then(function (builtInserts) {
        inserts = builtInserts
        done()
      })
  })

  it('should retrieve any current workload reports', function () {
    return getOpenWorkloadReports()
      .then(function (queryResults) {
        const ids = []
        queryResults.forEach(function (record) {
          ids.push(record.id)
        })

        expect(queryResults.length).to.greaterThan(0)
        expect(ids).to.contain(inserts.filter((item) => item.table === 'workload_report')[0].id)
      })
  })

  after(function (done) {
    helper.removeDependencies(inserts)
      .then(() => done())
  })
})

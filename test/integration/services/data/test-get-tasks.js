const expect = require('chai').expect

const helper = require('../../../helpers/data/app-tasks-helper')
const getTasks = require('../../../../app/services/data/get-tasks')

let inserts = []

describe('services/data/get-tasks', function () {
  before(function (done) {
    helper.insertDependencies(inserts)
      .then(function (builtInserts) {
        inserts = builtInserts
        done()
      })
  })

  it('should retrieve correct tasks for the given workload report id and type', function (done) {
    const workloadReportId = inserts.filter((item) => item.table === 'workload_report')[0].id
    const type = 'CREATE-WORKLOAD'
    getTasks(workloadReportId, type).then(function (results) {
      expect(results.length).to.equal(2)
      expect(results[0].status).to.eql('Status 1')
      expect(results[1].status).to.eql('Status 3')
      done()
    })
  })

  after(function (done) {
    helper.removeDependencies(inserts)
      .then(() => done())
  })
})

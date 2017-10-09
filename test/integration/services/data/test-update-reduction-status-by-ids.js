const expect = require('chai').expect

const appWorkloadOwnerHelper = require('../../../helpers/data/app-workload-owner-helper')
const appReductionsHelper = require('../../../helpers/data/app-reductions-helper')

const updateReductionStatusByIds = require('../../../../app/services/data/update-reduction-status-by-ids')
const getOpenReductions = require('../../../../app/services/data/get-open-reductions')

var inserts = []
var workloadReportId

describe('services/data/update-reduction-status-by-ids', function () {
  before(function (done) {
    appWorkloadOwnerHelper.insertDependencies(inserts)
      .then(function (builtInserts) {
        return appReductionsHelper.insertDependencies(inserts)
        .then(function (builtInserts) {
          inserts = builtInserts
          workloadReportId = inserts.filter((item) => item.table === 'workload_report')[0].id
          done()
        })
      })
  })

  it('should update the status for a set of ids', function () {
    var ids = []
    inserts.filter((item) => item.table === 'reductions').forEach(function (reduction) {
      ids.push(reduction.id)
    })

    return updateReductionStatusByIds(ids, 'ACTIVE')
    .then(function () {
      return getOpenReductions(1, 3, workloadReportId)
      .then(function (results) {
        results.forEach(function (result) {
          if (ids.includes(result.id)) {
            expect(result.status).to.equal('ACTIVE')
          }
        })
      })
    })
  })

  after(function (done) {
    appReductionsHelper.removeDependencies(inserts)
    .then(() => done())
  })
})

const expect = require('chai').expect

const appWorkloadOwnerHelper = require('../../../helpers/data/app-workload-owner-helper')
const appReductionsHelper = require('../../../helpers/data/app-reductions-helper')

const updateReductionStatusByIds = require('../../../../app/services/data/update-reduction-status-by-ids')
const getAllOpenReductions = require('../../../../app/services/data/get-all-open-reductions')

var inserts = []

describe('services/data/update-reduction-status-by-ids', function () {
  before(function (done) {
    appWorkloadOwnerHelper.insertDependencies(inserts)
      .then(function (builtInserts) {
        return appReductionsHelper.insertDependencies(inserts)
        .then(function (builtInserts) {
          inserts = builtInserts
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
      return getAllOpenReductions()
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

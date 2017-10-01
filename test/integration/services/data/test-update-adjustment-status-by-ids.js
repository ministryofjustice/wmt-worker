const expect = require('chai').expect

const appWorkloadOwnerHelper = require('../../../helpers/data/app-workload-owner-helper')
const appAdjustmentssHelper = require('../../../helpers/data/app-adjustments-helper')

const updateAdjustmentStatusByIds = require('../../../../app/services/data/update-adjustment-status-by-ids')
const getAllOpenAdjustments = require('../../../../app/services/data/get-all-open-adjustments')

var inserts = []

describe('services/data/update-adjustment-status-by-ids', function () {
  before(function (done) {
    appWorkloadOwnerHelper.insertDependencies(inserts)
      .then(function (builtInserts) {
        return appAdjustmentssHelper.insertDependencies(inserts)
        .then(function (builtInserts) {
          inserts = builtInserts
          done()
        })
      })
  })

  it('should update the status for a set of ids', function () {
    var ids = []
    inserts.filter((item) => item.table === 'adjustments').forEach(function (adjustment) {
      ids.push(adjustment.id)
    })

    return updateAdjustmentStatusByIds(ids, 'ACTIVE')
    .then(function () {
      return getAllOpenAdjustments()
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
    appAdjustmentssHelper.removeDependencies(inserts)
    .then(() => done())
  })
})

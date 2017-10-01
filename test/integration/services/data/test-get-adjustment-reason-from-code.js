const expect = require('chai').expect

const appAdjustmentReasonHelper = require('../../../helpers/data/app-adjustment-reason-helper')
const getAdjustmentReasonsFromCode = require('../../../../app/services/data/get-adjustment-reason-from-code')

var inserts = []

describe('services/data/get-adjustment-reason-from-code', function () {
  before(function () {
    return appAdjustmentReasonHelper.insertDependencies(inserts)
    .then(function (builtInserts) {
      inserts = builtInserts
    })
  })

  it('should retrieve the adjustment reason for given code', function () {
    return getAdjustmentReasonsFromCode('TST')
    .then(function (adjustmentReason) {
      var reasonId = inserts.filter((item) => item.table === 'adjustment_reason')[0].id
      expect(adjustmentReason.id).to.equal(reasonId)
    })
  })

  after(function () {
    return appAdjustmentReasonHelper.removeDependencies(inserts)
  })
})

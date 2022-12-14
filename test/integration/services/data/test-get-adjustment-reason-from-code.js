const expect = require('chai').expect

const appAdjustmentReasonHelper = require('../../../helpers/data/app-adjustment-reason-helper')
const removeIntegrationTestData = require('../../../helpers/data/remove-integration-test-data')
const getAdjustmentReasonsFromCode = require('../../../../app/services/data/get-adjustment-reason-from-code')

let inserts = []

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
        const expected = inserts.filter((item) => item.table === 'adjustment_reason')[0].data
        expect(adjustmentReason.points).to.equal(expected.points)
      })
  })

  after(function () {
    return removeIntegrationTestData()
  })
})

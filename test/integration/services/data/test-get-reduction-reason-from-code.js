const expect = require('chai').expect

const appReductionReasonHelper = require('../../../helpers/data/app-reduction-reason-helper')
const getReductionReasonsFromCode = require('../../../../app/services/data/get-reduction-reason-from-code')

var inserts = []

describe('services/data/get-reduction-reason-from-code', function () {
  before(function () {
    return appReductionReasonHelper.insertDependencies(inserts)
    .then(function (builtInserts) {
      inserts = builtInserts
    })
  })

  it('should retrieve the reduction reason with name', function () {
    return getReductionReasonsFromCode('Test Reason')
    .then(function (reductionReason) {
      var reasonId = inserts.filter((item) => item.table === 'reduction_reason')[0].id
      expect(reductionReason.id).to.equal(reasonId)
    })
  })

  after(function () {
    return appReductionReasonHelper.removeDependencies(inserts)
  })
})

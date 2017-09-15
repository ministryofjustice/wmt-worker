const expect = require('chai').expect

const appReductionReasonHelper = require('../../../helpers/data/app-reduction-reason-helper')
const getReductionReasonsFromName = require('../../../../app/services/data/get-reduction-reason-from-name')

var inserts = []

describe('services/data/get-reduction-reason-from-name', function () {
  before(function () {
    return appReductionReasonHelper.insertDependencies(inserts)
    .then(function (builtInserts) {
      inserts = builtInserts
    })
  })

  it('should retrieve the reduction reason with name', function () {
    return getReductionReasonsFromName('Test Reason')
    .then(function (reductionReason) {
      var reasonId = inserts.filter((item) => item.table === 'reduction_reason')[0].id
      expect(reductionReason.id).to.equal(reasonId)
    })
  })

  after(function () {
    return appReductionReasonHelper.removeDependencies(inserts)
  })
})

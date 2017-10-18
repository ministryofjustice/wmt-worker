const proxyquire = require('proxyquire')
const sinon = require('sinon')
require('sinon-bluebird')
const expect = require('chai').expect

const reductionStatus = require('../../../../app/constants/reduction-status')
const dateHelper = require('../../../helpers/data/date-helper')

var updateReductionStatusByIds
var updateReductionStatuses

var activeReduction = {
  id: 1,
  effectiveFrom: dateHelper.yesterday,
  effectiveTo: dateHelper.tomorrow,
  status: null
}

var scheduledReduction = {
  id: 2,
  effectiveFrom: dateHelper.tomorrow,
  effectiveTo: dateHelper.dayAfterTomorrow,
  status: null
}

var archivedReduction = {
  id: 3,
  effectiveFrom: dateHelper.dayBeforeYesterday,
  effectiveTo: dateHelper.yesterday,
  status: null
}

var existingActiveReduction = {
  id: 1,
  effectiveFrom: dateHelper.yesterday,
  effectiveTo: dateHelper.tomorrow,
  status: reductionStatus.ACTIVE
}

var reductions = [activeReduction, scheduledReduction, archivedReduction, existingActiveReduction]

describe('services/update-reduction-statuses', function () {
  beforeEach(function () {
    updateReductionStatusByIds = sinon.stub()
    updateReductionStatuses = proxyquire('../../../../app/services/update-reduction-statuses', {
      '../log': { info: function (message) { } },
      './data/update-reduction-status-by-ids': updateReductionStatusByIds
    })
  })

  it('should update the reduction statuses and call the database update service', function () {
    updateReductionStatusByIds.resolves(1)
    return updateReductionStatuses(reductions).then(function () {
      expect(updateReductionStatusByIds.calledWith([activeReduction.id], 'ACTIVE')).to.be.equal(true)
      expect(updateReductionStatusByIds.calledWith([scheduledReduction.id], 'SCHEDULED')).to.be.equal(true)
      expect(updateReductionStatusByIds.calledWith([archivedReduction.id], 'ARCHIVED')).to.be.equal(true)
    })
  })
})

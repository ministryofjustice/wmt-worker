const proxyquire = require('proxyquire')
const sinon = require('sinon')
require('sinon-bluebird')
const expect = require('chai').expect

const status = require('../../../../app/constants/reduction-status')
const dateHelper = require('../../../helpers/data/date-helper')

var statusUpdater
var updateReductionStatusByIds
var updateAdjustmentStatusByIds

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
  status: status.ACTIVE
}

var reductions = [activeReduction, scheduledReduction, archivedReduction, existingActiveReduction]

describe('services/update-adjustment-reduction-status', function () {
  beforeEach(function () {
    updateReductionStatusByIds = sinon.stub()
    updateAdjustmentStatusByIds = sinon.stub()
    statusUpdater = proxyquire('../../../../app/services/update-adjustment-reduction-status', {
      '../log': { info: function (message) { } },
      './data/update-reduction-status-by-ids': updateReductionStatusByIds,
      './data/update-adjustment-status-by-ids': updateAdjustmentStatusByIds
    })
  })

  describe('updateReductionStatuses', function () {
    it('should update the reduction statuses and call the database update service', function () {
      updateReductionStatusByIds.resolves(1)
      return statusUpdater.updateReductionStatuses(reductions).then(function () {
        expect(updateReductionStatusByIds.calledWith([activeReduction.id], status.ACTIVE)).to.be.equal(true)
        expect(updateReductionStatusByIds.calledWith([scheduledReduction.id], status.SCHEDULED)).to.be.equal(true)
        expect(updateReductionStatusByIds.calledWith([archivedReduction.id], status.ARCHIVED)).to.be.equal(true)
      })
    })
  })

  describe('updateAdjustmentStatuses', function () {
    it('should update the adjustment statuses and call the database update service', function () {
      updateReductionStatusByIds.resolves(1)
      return statusUpdater.updateAdjustmentStatuses(reductions).then(function () {
        expect(updateAdjustmentStatusByIds.calledWith([activeReduction.id], status.ACTIVE)).to.be.equal(true)
        expect(updateAdjustmentStatusByIds.calledWith([scheduledReduction.id], status.SCHEDULED)).to.be.equal(true)
        expect(updateAdjustmentStatusByIds.calledWith([archivedReduction.id], status.ARCHIVED)).to.be.equal(true)
      })
    })
  })
})

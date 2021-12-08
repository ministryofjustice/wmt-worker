const proxyquire = require('proxyquire')
const sinon = require('sinon')

const expect = require('chai').expect

const status = require('../../../../app/constants/reduction-status')
const dateHelper = require('../../../helpers/data/date-helper')

let statusUpdater
let updateReductionStatusByIds
let updateAdjustmentStatusByIds

const activeReduction = {
  id: 1,
  effectiveFrom: dateHelper.yesterday,
  effectiveTo: dateHelper.tomorrow,
  status: null,
  forename: 'Offender',
  surname: 'Manager',
  teamCode: 'TC1',
  teamDescription: 'Team Description',
  lduCode: 'LDU1',
  lduDescription: 'LDU Description',
  regionCode: 'RG1',
  regionDescription: 'Region Description',
  reason: 'Reduction Reason',
  hours: 10,
  additionalNotes: 'Some Notes'
}

const scheduledReduction = {
  id: 2,
  effectiveFrom: dateHelper.tomorrow,
  effectiveTo: dateHelper.dayAfterTomorrow,
  status: null,
  forename: 'Offender',
  surname: 'Manager',
  teamCode: 'TC2',
  teamDescription: 'Team Description',
  lduCode: 'LDU2',
  lduDescription: 'LDU Description',
  regionCode: 'RG2',
  regionDescription: 'Region Description',
  reason: 'Reduction Reason',
  hours: 10,
  additionalNotes: 'Some Notes'
}

const archivedReduction = {
  id: 3,
  effectiveFrom: dateHelper.dayBeforeYesterday,
  effectiveTo: dateHelper.yesterday,
  status: null,
  forename: 'Offender',
  surname: 'Manager',
  teamCode: 'TC3',
  teamDescription: 'Team Description',
  lduCode: 'LDU3',
  lduDescription: 'LDU Description',
  regionCode: 'RG3',
  regionDescription: 'Region Description',
  reason: 'Reduction Reason',
  hours: 10,
  additionalNotes: 'Some Notes'
}

const existingActiveReduction = {
  id: 4,
  effectiveFrom: dateHelper.yesterday,
  effectiveTo: dateHelper.tomorrow,
  status: status.ACTIVE,
  forename: 'Offender',
  surname: 'Manager',
  teamCode: 'TC4',
  teamDescription: 'Team Description',
  lduCode: 'LDU4',
  lduDescription: 'LDU Description',
  regionCode: 'RG4',
  regionDescription: 'Region Description',
  reason: 'Reduction Reason',
  hours: 10,
  additionalNotes: 'Some Notes'
}

const reductions = [activeReduction, scheduledReduction, archivedReduction, existingActiveReduction]

describe('services/update-adjustment-reduction-status', function () {
  beforeEach(function () {
    updateReductionStatusByIds = sinon.stub()
    updateAdjustmentStatusByIds = sinon.stub()
    statusUpdater = proxyquire('../../../../app/services/update-adjustment-reduction-status', {
      './log': { info: function (message) { } },
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

const expect = require('chai').expect
const proxyquire = require('proxyquire')
const sinon = require('sinon')
require('sinon-bluebird')

const adjustmentStatus = require('../../../../app/constants/adjustment-status')

var mapStagingCmsAdjustments
var getStagingCmsRecords
var getWorkloadOwnerId
var getReductionReasonFromCode

const reductionReason = {
  id: 1,
  points: 15
}

var now = new Date()
var thirtyDays = new Date(now)
thirtyDays.setDate(thirtyDays.getDate() + 30)

const cmsStagingRows = [{
  contactId: 123,
  contactCode: 'abc',
  contactTypeDesc: 'def',
  contactDate: now,
  contactStaffKey: 12,
  contactTeamKey: 13,
  omKey: 14,
  omTeamKey: 15
}, {
  contactId: 321,
  contactCode: 'cba',
  contactTypeDesc: 'fed',
  contactDate: now,
  contactStaffKey: 21,
  contactTeamKey: 31,
  omKey: 41,
  omTeamKey: 51
}]

const expectedAdjustments = [
  {
    contactId: cmsStagingRows[0].contactId,
    workloadOwnerId: 1,
    points: reductionReason.points,
    reductionReasonId: reductionReason.id,
    effectiveFrom: now,
    effectiveTo: thirtyDays,
    status: adjustmentStatus.ACTIVE
  },
  {
    contactId: cmsStagingRows[0].contactId,
    workloadOwnerId: 1,
    points: reductionReason.points * -1,
    reductionReasonId: reductionReason.id,
    effectiveFrom: now,
    effectiveTo: thirtyDays,
    status: adjustmentStatus.ACTIVE
  },
  {
    contactId: cmsStagingRows[1].contactId,
    workloadOwnerId: 1,
    points: reductionReason.points,
    reductionReasonId: reductionReason.id,
    effectiveFrom: now,
    effectiveTo: thirtyDays,
    status: adjustmentStatus.ACTIVE
  },
  {
    contactId: cmsStagingRows[1].contactId,
    workloadOwnerId: 1,
    points: reductionReason.points * -1,
    reductionReasonId: reductionReason.id,
    effectiveFrom: now,
    effectiveTo: thirtyDays,
    status: adjustmentStatus.ACTIVE
  }
]
describe('services/map-staging-cms-adjustments', function () {
  beforeEach(function (done) {
    getStagingCmsRecords = sinon.stub()
    getWorkloadOwnerId = sinon.stub()
    getReductionReasonFromCode = sinon.stub()

    mapStagingCmsAdjustments = proxyquire('../../../../app/services/map-staging-cms-adjustments', {
      './data/get-staging-cms': getStagingCmsRecords,
      './data/get-app-workload-owner-id': getWorkloadOwnerId,
      './data/get-reduction-reason-from-code': getReductionReasonFromCode
    })
    done()
  })

  it('should call getStagingCmsAdjustments and when no records return do nothing', function () {
    getStagingCmsRecords.resolves(undefined)
    getWorkloadOwnerId.resolves(1)
    getReductionReasonFromCode.resolves(reductionReason)

    return mapStagingCmsAdjustments()
    .then(function (result) {
      expect(result).to.be.eql([])
      expect(getStagingCmsRecords.called).to.be.equal(true)
      expect(getWorkloadOwnerId.called).to.be.equal(false)
      expect(getReductionReasonFromCode.called).to.be.equal(false)
    })
  })

  it('should return 2 reductions for each row in the cms staging table', function () {
    getStagingCmsRecords.resolves(cmsStagingRows)
    getWorkloadOwnerId.resolves(1)
    getReductionReasonFromCode.resolves(reductionReason)

    return mapStagingCmsAdjustments()
    .then(function (result) {
      expect(result.length).to.be.eql(4)
      expect(result).to.be.eql(expectedAdjustments)
      expect(getStagingCmsRecords.called).to.be.equal(true)
      expect(getWorkloadOwnerId.calledWith(cmsStagingRows[0].contactStaffKey, cmsStagingRows[0].contactTeamKey)).to.be.equal(true)
      expect(getWorkloadOwnerId.calledWith(cmsStagingRows[0].omKey, cmsStagingRows[0].omTeamKey)).to.be.equal(true)
      expect(getWorkloadOwnerId.calledWith(cmsStagingRows[1].contactStaffKey, cmsStagingRows[1].contactTeamKey)).to.be.equal(true)
      expect(getWorkloadOwnerId.calledWith(cmsStagingRows[1].omKey, cmsStagingRows[1].omTeamKey)).to.be.equal(true)
      expect(getReductionReasonFromCode.called).to.be.equal(true)
    })
  })
})

const expect = require('chai').expect
const proxyquire = require('proxyquire')
const sinon = require('sinon')
require('sinon-bluebird')

const reductionStatus = require('../../../../app/constants/reduction-status')

var mapStagingCmsReductions
var getStagingCmsReductions
var getWorkloadOwnerId
var getReductionReasonFromCode

const reductionReason = {
  id: 1,
  fixedAllowanceHours: 0.5
}

var now = new Date()
var thirtyDays = new Date(now)
thirtyDays.setDate(thirtyDays.getDate() + 30)

const cmsReductionRows = [{
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

const expectedReductions = [
  {
    contactId: cmsReductionRows[0].contactId,
    workloadOwnerId: 1,
    hours: reductionReason.fixedAllowanceHours,
    reductionReasonId: reductionReason.id,
    effectiveFrom: now,
    effectiveTo: thirtyDays,
    status: reductionStatus.ACTIVE,
    note: null
  },
  {
    contactId: cmsReductionRows[0].contactId,
    workloadOwnerId: 1,
    hours: reductionReason.fixedAllowanceHours * -1,
    reductionReasonId: reductionReason.id,
    effectiveFrom: now,
    effectiveTo: thirtyDays,
    status: reductionStatus.ACTIVE,
    note: null
  },
  {
    contactId: cmsReductionRows[1].contactId,
    workloadOwnerId: 1,
    hours: reductionReason.fixedAllowanceHours,
    reductionReasonId: reductionReason.id,
    effectiveFrom: now,
    effectiveTo: thirtyDays,
    status: reductionStatus.ACTIVE,
    note: null
  },
  {
    contactId: cmsReductionRows[1].contactId,
    workloadOwnerId: 1,
    hours: reductionReason.fixedAllowanceHours * -1,
    reductionReasonId: reductionReason.id,
    effectiveFrom: now,
    effectiveTo: thirtyDays,
    status: reductionStatus.ACTIVE,
    note: null
  }
]
describe('services/map-stagin-cms-reduction', function () {
  beforeEach(function (done) {
    getStagingCmsReductions = sinon.stub()
    getWorkloadOwnerId = sinon.stub()
    getReductionReasonFromCode = sinon.stub()

    mapStagingCmsReductions = proxyquire('../../../../app/services/map-staging-cms-reductions', {
      './data/get-staging-cms-reductions': getStagingCmsReductions,
      './data/get-app-workload-owner-id': getWorkloadOwnerId,
      './data/get-reduction-reason-from-code': getReductionReasonFromCode
    })
    done()
  })

  it('should call getStagingCmsReductions and when no records return do nothing', function () {
    getStagingCmsReductions.resolves(undefined)
    getWorkloadOwnerId.resolves(1)
    getReductionReasonFromCode.resolves(reductionReason)

    return mapStagingCmsReductions()
    .then(function (result) {
      expect(result).to.be.eql([])
      expect(getStagingCmsReductions.called).to.be.equal(true)
      expect(getWorkloadOwnerId.called).to.be.equal(false)
      expect(getReductionReasonFromCode.called).to.be.equal(false)
    })
  })

  it('should return 2 reductions for each row in the cms staging table', function () {
    getStagingCmsReductions.resolves(cmsReductionRows)
    getWorkloadOwnerId.resolves(1)
    getReductionReasonFromCode.resolves(reductionReason)

    return mapStagingCmsReductions()
    .then(function (result) {
      expect(result.length).to.be.eql(4)
      expect(result).to.be.eql(expectedReductions)
      expect(getStagingCmsReductions.called).to.be.equal(true)
      expect(getWorkloadOwnerId.calledWith(cmsReductionRows[0].contactStaffKey, cmsReductionRows[0].contactTeamKey)).to.be.equal(true)
      expect(getWorkloadOwnerId.calledWith(cmsReductionRows[0].omKey, cmsReductionRows[0].omTeamKey)).to.be.equal(true)
      expect(getWorkloadOwnerId.calledWith(cmsReductionRows[1].contactStaffKey, cmsReductionRows[1].contactTeamKey)).to.be.equal(true)
      expect(getWorkloadOwnerId.calledWith(cmsReductionRows[1].omKey, cmsReductionRows[1].omTeamKey)).to.be.equal(true)
      expect(getReductionReasonFromCode.called).to.be.equal(true)
    })
  })
})

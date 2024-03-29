const expect = require('chai').expect
const proxyquire = require('proxyquire')
const sinon = require('sinon')

const dataHelper = require('../../../helpers/data/staging-adjustments-helper')

let stagingAdjustmentsMapper
let getStagingCms
let getWorkloadOwnerId
let getAdjustmentReasonFromCode
let getWorkloadOwnersInWorkloadRange

const stagingAdjustmentRows = dataHelper.stagingAdjustmentRows
const adjustmentReason = dataHelper.adjustmentReason
const expectedCmsAdjustments = dataHelper.expectedCmsAdjustments

const workloadStagingIdStart = 1
const workloadStagingIdEnd = 5
const workloadReportId = 11

describe('services/staging-adjustments-mapper', function () {
  beforeEach(function () {
    getStagingCms = sinon.stub()
    getWorkloadOwnerId = sinon.stub()
    getAdjustmentReasonFromCode = sinon.stub()
    getWorkloadOwnersInWorkloadRange = sinon.stub()

    stagingAdjustmentsMapper = proxyquire('../../../../app/services/staging-adjustments-mapper', {
      './data/get-workload-owners-in-workload-range': getWorkloadOwnersInWorkloadRange,
      './data/get-staging-cms': getStagingCms,
      './data/get-app-workload-owner-id': getWorkloadOwnerId,
      './data/get-adjustment-reason-from-code': getAdjustmentReasonFromCode
    })
  })

  describe('mapCmsAdjustments', function () {
    it('should call getWorkloadOwnersInWorkloadRange', function () {
      getWorkloadOwnersInWorkloadRange.resolves([])
      getStagingCms.resolves([])

      return stagingAdjustmentsMapper.mapCmsAdjustments(workloadStagingIdStart, workloadStagingIdEnd, workloadReportId)
        .then(function (result) {
          expect(getWorkloadOwnersInWorkloadRange.called).to.be.equal(true)
        })
    })

    it('should call getStagingCmsAdjustments and when no records return, do nothing', function () {
      getStagingCms.resolves(undefined)
      getWorkloadOwnerId.resolves(1)
      getAdjustmentReasonFromCode.resolves(adjustmentReason)
      getWorkloadOwnersInWorkloadRange.resolves([1])

      return stagingAdjustmentsMapper.mapCmsAdjustments(workloadStagingIdStart, workloadStagingIdEnd, workloadReportId)
        .then(function (result) {
          expect(result).to.be.eql([])
          expect(getStagingCms.called).to.be.equal(true)
          expect(getWorkloadOwnerId.called).to.be.equal(false)
          expect(getAdjustmentReasonFromCode.called).to.be.equal(false)
        })
    })

    it('should return 2 adjustments for each row in the CMS staging table', function () {
      getStagingCms.resolves(stagingAdjustmentRows)
      getWorkloadOwnerId.resolves(1)
      getAdjustmentReasonFromCode.resolves(adjustmentReason)
      getWorkloadOwnersInWorkloadRange.resolves([1])

      return stagingAdjustmentsMapper.mapCmsAdjustments(workloadStagingIdStart, workloadStagingIdEnd, workloadReportId)
        .then(function (result) {
          expect(result.length).to.be.eql(4)
          expect(result).to.be.eql(expectedCmsAdjustments)
          expect(getStagingCms.called).to.be.equal(true)
          expect(getWorkloadOwnersInWorkloadRange.called).to.be.equal(true)
          expect(getWorkloadOwnerId.calledWith(stagingAdjustmentRows[0].contactStaffKey, stagingAdjustmentRows[0].contactTeamKey)).to.be.equal(true)
          expect(getWorkloadOwnerId.calledWith(stagingAdjustmentRows[0].omKey, stagingAdjustmentRows[0].omTeamKey)).to.be.equal(true)
          expect(getWorkloadOwnerId.calledWith(stagingAdjustmentRows[1].contactStaffKey, stagingAdjustmentRows[1].contactTeamKey)).to.be.equal(true)
          expect(getWorkloadOwnerId.calledWith(stagingAdjustmentRows[1].omKey, stagingAdjustmentRows[1].omTeamKey)).to.be.equal(true)
          expect(getAdjustmentReasonFromCode.called).to.be.equal(true)
        })
    })

    it('should return 0 adjustments if workload owner is not in batch', function () {
      getStagingCms.resolves(undefined)
      getWorkloadOwnerId.resolves(1)
      getAdjustmentReasonFromCode.resolves(adjustmentReason)
      getWorkloadOwnersInWorkloadRange.resolves([2])

      return stagingAdjustmentsMapper.mapCmsAdjustments(workloadStagingIdStart, workloadStagingIdEnd, workloadReportId)
        .then(function (result) {
          expect(result).to.be.eql([])
          expect(getWorkloadOwnersInWorkloadRange.called).to.be.equal(true)
          expect(getStagingCms.called).to.be.equal(true)
          expect(getWorkloadOwnerId.called).to.be.equal(false)
          expect(getAdjustmentReasonFromCode.called).to.be.equal(false)
        })
    })

    it('should return 0 adjustments if start date is greater than 7 days old', function () {
      getStagingCms.resolves(dataHelper.stagingAdjustmentRowOlderThanSevenDays)
      getWorkloadOwnerId.resolves(1)
      getAdjustmentReasonFromCode.resolves(adjustmentReason)
      getWorkloadOwnersInWorkloadRange.resolves([1])
      return stagingAdjustmentsMapper.mapCmsAdjustments(workloadStagingIdStart, workloadStagingIdEnd, workloadReportId)
        .then(function (result) {
          expect(result).to.be.eql([])
        })
    })
  })
})

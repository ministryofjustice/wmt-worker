const expect = require('chai').expect
const proxyquire = require('proxyquire')
const sinon = require('sinon')
require('sinon-bluebird')

const dataHelper = require('../../../helpers/data/staging-reductions-helper')

var stagingReductionsMapper
var getStagingCmsReductions
var getStagingGsReductions
var getWorkloadOwnerId
var getReductionReasonFromCode

var reductionRows = dataHelper.reductionRows
var reductionReason = dataHelper.reductionReason
var expectedGsReductions = dataHelper.expectedGsReductions
var expectedCmsReductions = dataHelper.expectedCmsReductions

describe('services/staging-reductions-mapper', function () {
  beforeEach(function (done) {
    getStagingCmsReductions = sinon.stub()
    getStagingGsReductions = sinon.stub()
    getWorkloadOwnerId = sinon.stub()
    getReductionReasonFromCode = sinon.stub()

    stagingReductionsMapper = proxyquire('../../../../app/services/staging-reductions-mapper', {
      './data/get-staging-cms-reductions': getStagingCmsReductions,
      './data/get-staging-gs-reductions': getStagingGsReductions,
      './data/get-app-workload-owner-id': getWorkloadOwnerId,
      './data/get-reduction-reason-from-code': getReductionReasonFromCode
    })
    done()
  })

  describe('mapCmsReductions', function () {
    it('should call getStagingCmsReductions and when no records return do nothing', function () {
      getStagingCmsReductions.resolves(undefined)
      getWorkloadOwnerId.resolves(1)
      getReductionReasonFromCode.resolves(reductionReason)

      return stagingReductionsMapper.mapCmsReductions()
      .then(function (result) {
        expect(result).to.be.eql([])
        expect(getStagingCmsReductions.called).to.be.equal(true)
        expect(getWorkloadOwnerId.called).to.be.equal(false)
        expect(getReductionReasonFromCode.called).to.be.equal(false)
      })
    })

    it('should return 2 reductions for each row in the cms staging table', function () {
      getStagingCmsReductions.resolves(reductionRows)
      getWorkloadOwnerId.resolves(1)
      getReductionReasonFromCode.resolves(reductionReason)

      return stagingReductionsMapper.mapCmsReductions()
      .then(function (result) {
        expect(result.length).to.be.eql(4)
        expect(result).to.be.eql(expectedCmsReductions)
        expect(getStagingCmsReductions.called).to.be.equal(true)
        expect(getWorkloadOwnerId.calledWith(reductionRows[0].contactStaffKey, reductionRows[0].contactTeamKey)).to.be.equal(true)
        expect(getWorkloadOwnerId.calledWith(reductionRows[0].omKey, reductionRows[0].omTeamKey)).to.be.equal(true)
        expect(getWorkloadOwnerId.calledWith(reductionRows[1].contactStaffKey, reductionRows[1].contactTeamKey)).to.be.equal(true)
        expect(getWorkloadOwnerId.calledWith(reductionRows[1].omKey, reductionRows[1].omTeamKey)).to.be.equal(true)
        expect(getReductionReasonFromCode.called).to.be.equal(true)
      })
    })
  })

  describe('mapGsReductions', function () {
    it('should call getStagingGsReductions and when no records return do nothing', function () {
      getStagingGsReductions.resolves(undefined)
      getWorkloadOwnerId.resolves(1)
      getReductionReasonFromCode.resolves(reductionReason)

      return stagingReductionsMapper.mapGsReductions()
      .then(function (result) {
        expect(result).to.be.eql([])
        expect(getStagingGsReductions.called).to.be.equal(true)
        expect(getReductionReasonFromCode.called).to.be.equal(false)
        expect(getWorkloadOwnerId.called).to.be.equal(false)
      })
    })

    it('should return one reduction for each row in the gs staging table with the correct values', function () {
      getStagingGsReductions.resolves(reductionRows)
      getWorkloadOwnerId.resolves(1)
      getReductionReasonFromCode.resolves(reductionReason)

      return stagingReductionsMapper.mapGsReductions()
      .then(function (result) {
        expect(result.length).to.be.eql(2)
        expect(result).to.be.eql(expectedGsReductions)
        expect(getStagingGsReductions.called).to.be.equal(true)
        expect(getWorkloadOwnerId.calledWith(reductionRows[0].omKey, reductionRows[0].omTeamKey)).to.be.equal(true)
        expect(getWorkloadOwnerId.calledWith(reductionRows[1].omKey, reductionRows[1].omTeamKey)).to.be.equal(true)
        expect(getReductionReasonFromCode.called).to.be.equal(true)
      })
    })
  })
})

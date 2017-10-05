const expect = require('chai').expect
const proxyquire = require('proxyquire')
const sinon = require('sinon')
require('sinon-bluebird')
const pointsHelper = require('wmt-probation-rules').pointsHelper

const Batch = require('../../../../app/services/domain/batch')
const wpcOperation = require('../../../../app/constants/calculate-workload-points-operation')

const WORKLOAD_ID = 10
const BATCH_SIZE = 20
const MAX_ID = WORKLOAD_ID + BATCH_SIZE - 1
const REPORT_ID = 30
const REDUCTION_HOURS = 7
const CONTRACTED_HOURS = 37.5
const SDR_POINTS = 20
const PAROM_POINTS = 10
const WORKLOAD_POINTS = 200
const CMS_POINTS_POSITIVE = 15
const CMS_POINTS_NEGATIVE = -15
const NOMINAL_TARGET = 300
const AVAILABLE_POINTS = 50

var calculateWorkloadPoints
var getWorkloadsStub
var probationRulesStub
var getPointsConfigurationStub
var getOffenderManagerTypeIdStub
var insertWorkloadPointsCalculationsStub
var getAppReductions
var getCmsAdjustmentPoints
var getContractedHours
var task

describe('services/workers/calculate-workload-points', function () {
  beforeEach(function () {
    getWorkloadsStub = sinon.stub()
    getAppReductions = sinon.stub()
    getCmsAdjustmentPoints = sinon.stub()

    getContractedHours = sinon.stub()
    getPointsConfigurationStub = sinon.stub()
    getOffenderManagerTypeIdStub = sinon.stub()
    insertWorkloadPointsCalculationsStub = sinon.stub()

    probationRulesStub = {}
    probationRulesStub.calculateWorkloadPoints = sinon.stub()
    probationRulesStub.calculateNominalTarget = sinon.stub()
    probationRulesStub.calculateParomPoints = sinon.stub()
    probationRulesStub.calculateSdrConversionPoints = sinon.stub()
    probationRulesStub.calculateAvailablePoints = sinon.stub()

    task = {
      id: 1,
      workloadReportId: REPORT_ID,
      additionalData: {
        workloadBatch: new Batch(WORKLOAD_ID, BATCH_SIZE),
        operationType: wpcOperation.INSERT
      }
    }

    calculateWorkloadPoints = proxyquire('../../../../app/services/workers/calculate-workload-points', {
      '../log': { info: function (message) {}, error: function (message) {} },
      '../data/get-app-workloads': getWorkloadsStub,
      '../data/get-workload-points-configuration': getPointsConfigurationStub,
      '../data/get-offender-manager-type-id': getOffenderManagerTypeIdStub,
      '../data/get-app-reductions': getAppReductions,
      '../data/get-contracted-hours': getContractedHours,
      '../data/insert-workload-points-calculation': insertWorkloadPointsCalculationsStub,
      'wmt-probation-rules': probationRulesStub,
      '../data/get-adjustment-points': getCmsAdjustmentPoints
    })
    getWorkloadsStub.resolves([{values: sinon.stub(), id: WORKLOAD_ID}])
    getPointsConfigurationStub.resolves({values: pointsHelper.getCaseTypeWeightings(), id: WORKLOAD_ID})
    getAppReductions.resolves(REDUCTION_HOURS)
    getContractedHours.resolves(CONTRACTED_HOURS)
    probationRulesStub.calculateSdrConversionPoints.returns(SDR_POINTS)
    probationRulesStub.calculateParomPoints.returns(PAROM_POINTS)
    probationRulesStub.calculateWorkloadPoints.returns(WORKLOAD_POINTS)
    getOffenderManagerTypeIdStub.resolves(WORKLOAD_ID)
    probationRulesStub.calculateNominalTarget.returns(NOMINAL_TARGET)
    probationRulesStub.calculateAvailablePoints.returns(AVAILABLE_POINTS)
  })

  it('calls the get workloads promise correctly', function (done) {
    getCmsAdjustmentPoints.resolves(0)
    calculateWorkloadPoints.execute(task).then(function () {
      expect(getWorkloadsStub.calledWith(WORKLOAD_ID, MAX_ID, BATCH_SIZE)).to.equal(true)
      done()
    })
  })

  it('calls the get workloads promise correctly with a batchSize of 1', function (done) {
    task = {
      id: 1,
      workloadReportId: REPORT_ID,
      additionalData: {
        workloadBatch: new Batch(WORKLOAD_ID, 1),
        operationType: wpcOperation.INSERT
      }}
    getCmsAdjustmentPoints.resolves(0)
    var maxId = 10
    var batchSize = 1
    calculateWorkloadPoints.execute(task).then(function () {
      expect(getWorkloadsStub.calledWith(WORKLOAD_ID, maxId, batchSize)).to.equal(true)
      done()
    })
  })

  it('retrieves the points configuration', function (done) {
    getCmsAdjustmentPoints.resolves(0)
    calculateWorkloadPoints.execute(task).then(function () {
      expect(getPointsConfigurationStub.called).to.equal(true)
      done()
    })
  })

  it('calls calculateSdrConversionPoints', function (done) {
    getCmsAdjustmentPoints.resolves(0)
    insertWorkloadPointsCalculationsStub.resolves()
    getWorkloadsStub.resolves([{values: sinon.stub(), id: WORKLOAD_ID}])

    calculateWorkloadPoints.execute(task).then(function () {
      expect(probationRulesStub.calculateSdrConversionPoints.called).to.equal(true)
      done()
    })
  })

  it('should call insertWorkloadPointsCalculations with the correct params when positive CMS adjustments are applied', function (done) {
    getCmsAdjustmentPoints.resolves(CMS_POINTS_POSITIVE)

    var expectedTotalPoints = (WORKLOAD_POINTS + SDR_POINTS + SDR_POINTS + PAROM_POINTS + CMS_POINTS_POSITIVE)

    calculateWorkloadPoints.execute(task).then(function () {
      expect(
        insertWorkloadPointsCalculationsStub.calledWith(REPORT_ID, WORKLOAD_ID, WORKLOAD_ID, expectedTotalPoints, SDR_POINTS, SDR_POINTS,
          PAROM_POINTS, NOMINAL_TARGET, AVAILABLE_POINTS, REDUCTION_HOURS, CONTRACTED_HOURS, CMS_POINTS_POSITIVE)
      ).to.equal(true)
      done()
    })
  })

  it('should call insertWorkloadPointsCalculations with the correct params when negative CMS adjustments are applied', function (done) {
    getCmsAdjustmentPoints.resolves(CMS_POINTS_NEGATIVE)

    var expectedTotalPoints = (WORKLOAD_POINTS + SDR_POINTS + SDR_POINTS + PAROM_POINTS + CMS_POINTS_NEGATIVE)

    calculateWorkloadPoints.execute(task).then(function () {
      expect(
        insertWorkloadPointsCalculationsStub.calledWith(REPORT_ID, WORKLOAD_ID, WORKLOAD_ID, expectedTotalPoints, SDR_POINTS, SDR_POINTS,
          PAROM_POINTS, NOMINAL_TARGET, AVAILABLE_POINTS, REDUCTION_HOURS, CONTRACTED_HOURS, CMS_POINTS_NEGATIVE)
      ).to.equal(true)
      done()
    })
  })
})

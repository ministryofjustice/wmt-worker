const expect = require('chai').expect
const proxyquire = require('proxyquire')
const sinon = require('sinon')
require('sinon-bluebird')
const pointsHelper = require('wmt-probation-rules').pointsHelper

const Batch = require('../../../../app/services/domain/batch')
const operationTypes = require('../../../../app/constants/calculation-tasks-operation-type')
const adjustmentCategory = require('../../../../app/constants/adjustment-category')

const T2A_WORKLOAD_POINTS_ID = 10
const WORKLOAD_POINTS_ID = 10
const WORKLOAD_ID = 10
const BATCH_SIZE = 20
const MAX_ID = WORKLOAD_ID + BATCH_SIZE - 1
const REPORT_ID = 30
const REDUCTION_HOURS = 7
const CONTRACTED_HOURS = 37.5
const SDR_POINTS = 20
const PAROM_POINTS = 10
const WORKLOAD_POINTS = 200
const ARMS_CASES = 3
const CMS_POINTS_POSITIVE = 15
const CMS_POINTS_NEGATIVE = -15
const NOMINAL_TARGET = 300
const AVAILABLE_POINTS = 50
const WORKLOAD_POINTS_BREAKDOWN = {
  total: WORKLOAD_POINTS,
  sdrConversionPoints: SDR_POINTS,
  sdrPoints: SDR_POINTS,
  paromsPoints: PAROM_POINTS
}
const GS_POINTS = -10

var calculateWorkloadPoints
var parseWorkloadsStub
var probationRulesStub
var getPointsConfigurationStub
var getOffenderManagerTypeIdStub
var insertWorkloadPointsCalculationsStub
var updateWorkloadPointsCalculationsStub
var getAppReductions
var getAdjustmentPoints
var getContractedHours
var task
var workloads
var checkForDuplicateCalculation

describe('services/workers/calculate-workload-points', function () {
  beforeEach(function () {
    parseWorkloadsStub = sinon.stub()
    getAppReductions = sinon.stub()
    getAdjustmentPoints = sinon.stub()

    getContractedHours = sinon.stub()
    getPointsConfigurationStub = sinon.stub()
    getOffenderManagerTypeIdStub = sinon.stub()
    insertWorkloadPointsCalculationsStub = sinon.stub()
    updateWorkloadPointsCalculationsStub = sinon.stub()
    checkForDuplicateCalculation = sinon.stub()

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
        operationType: operationTypes.INSERT
      }
    }

    workloads = { armsLicenseCases: 1, armsCommunityCases: 2 }

    calculateWorkloadPoints = proxyquire('../../../../app/services/workers/calculate-workload-points', {
      '../log': { info: function (message) {}, error: function (message) {} },
      '../parse-app-workloads': parseWorkloadsStub,
      '../data/get-app-reduction-hours': getAppReductions,
      '../data/get-workload-points-configuration': getPointsConfigurationStub,
      '../data/get-offender-manager-type-id': getOffenderManagerTypeIdStub,
      '../data/get-contracted-hours': getContractedHours,
      '../data/insert-workload-points-calculation': insertWorkloadPointsCalculationsStub,
      '../data/update-workload-points-calculation': updateWorkloadPointsCalculationsStub,
      'wmt-probation-rules': probationRulesStub,
      '../data/get-adjustment-points': getAdjustmentPoints,
      '../data/check-for-duplicate-calculation': checkForDuplicateCalculation
    })
    parseWorkloadsStub.resolves([{values: workloads, id: WORKLOAD_ID}])
    getPointsConfigurationStub.resolves({values: pointsHelper.getCaseTypeWeightings(), id: WORKLOAD_ID})
    getAppReductions.resolves(REDUCTION_HOURS)
    getContractedHours.resolves(CONTRACTED_HOURS)
    probationRulesStub.calculateWorkloadPoints.returns(WORKLOAD_POINTS_BREAKDOWN)
    getOffenderManagerTypeIdStub.resolves(WORKLOAD_ID)
    probationRulesStub.calculateNominalTarget.returns(NOMINAL_TARGET)
    probationRulesStub.calculateAvailablePoints.returns(AVAILABLE_POINTS)
  })

  it('calls the get workloads promise correctly', function () {
    checkForDuplicateCalculation.resolves(undefined)
    getAdjustmentPoints.resolves(0)
    return calculateWorkloadPoints.execute(task).then(function () {
      expect(parseWorkloadsStub.calledWith(WORKLOAD_ID, MAX_ID, BATCH_SIZE)).to.equal(true)
    })
  })

  it('calls the get workloads promise correctly with a batchSize of 1', function () {
    task = {
      id: 1,
      workloadReportId: REPORT_ID,
      additionalData: {
        workloadBatch: new Batch(WORKLOAD_ID, 1),
        operationType: operationTypes.INSERT
      }}
    checkForDuplicateCalculation.resolves(undefined)
    getAdjustmentPoints.resolves(0)
    var batchSize = 1
    return calculateWorkloadPoints.execute(task).then(function () {
      expect(parseWorkloadsStub.calledWith(WORKLOAD_ID, WORKLOAD_ID, batchSize)).to.equal(true)
    })
  })

  it('retrieves the points configuration', function () {
    checkForDuplicateCalculation.resolves(undefined)
    getAdjustmentPoints.resolves(0)
    return calculateWorkloadPoints.execute(task).then(function () {
      expect(getPointsConfigurationStub.called).to.equal(true)
    })
  })

  it('should call insertWorkloadPointsCalculations with the correct params when positive CMS adjustments are applied', function () {
    checkForDuplicateCalculation.resolves(undefined)
    getAdjustmentPoints.withArgs(undefined, adjustmentCategory.CMS).resolves(CMS_POINTS_POSITIVE)
    getAdjustmentPoints.withArgs(undefined, adjustmentCategory.GS).resolves(0)

    var expectedTotalPoints = (WORKLOAD_POINTS + CMS_POINTS_POSITIVE)

    return calculateWorkloadPoints.execute(task).then(function () {
      expect(
        insertWorkloadPointsCalculationsStub.calledWith(REPORT_ID, WORKLOAD_POINTS_ID, T2A_WORKLOAD_POINTS_ID, WORKLOAD_ID, expectedTotalPoints, SDR_POINTS, SDR_POINTS,
          PAROM_POINTS, NOMINAL_TARGET, AVAILABLE_POINTS, CONTRACTED_HOURS, REDUCTION_HOURS, CMS_POINTS_POSITIVE, 0, ARMS_CASES)
      ).to.equal(true)
    })
  })

  it('should call insertWorkloadPointsCalculations with the correct params when negative CMS adjustments are applied', function () {
    checkForDuplicateCalculation.resolves(undefined)
    getAdjustmentPoints.withArgs(undefined, adjustmentCategory.CMS).resolves(CMS_POINTS_NEGATIVE)
    getAdjustmentPoints.withArgs(undefined, adjustmentCategory.GS).resolves(0)

    var expectedTotalPoints = (WORKLOAD_POINTS + CMS_POINTS_NEGATIVE)

    return calculateWorkloadPoints.execute(task).then(function () {
      expect(
        insertWorkloadPointsCalculationsStub.calledWith(REPORT_ID, WORKLOAD_POINTS_ID, T2A_WORKLOAD_POINTS_ID, WORKLOAD_ID, expectedTotalPoints, SDR_POINTS, SDR_POINTS,
          PAROM_POINTS, NOMINAL_TARGET, AVAILABLE_POINTS, CONTRACTED_HOURS, REDUCTION_HOURS, CMS_POINTS_NEGATIVE, 0, ARMS_CASES)
      ).to.equal(true)
    })
  })

  it('should call insertWorkloadPointsCalculations with the correct params when GS adjustments are applied', function () {
    checkForDuplicateCalculation.resolves(undefined)
    getAdjustmentPoints.withArgs(undefined, adjustmentCategory.CMS).resolves(0)
    getAdjustmentPoints.withArgs(undefined, adjustmentCategory.GS).resolves(GS_POINTS)

    var expectedTotalPoints = (WORKLOAD_POINTS + GS_POINTS)

    return calculateWorkloadPoints.execute(task).then(function () {
      expect(
        insertWorkloadPointsCalculationsStub.calledWith(REPORT_ID, WORKLOAD_POINTS_ID, T2A_WORKLOAD_POINTS_ID, WORKLOAD_ID, expectedTotalPoints, SDR_POINTS, SDR_POINTS,
          PAROM_POINTS, NOMINAL_TARGET, AVAILABLE_POINTS, CONTRACTED_HOURS, REDUCTION_HOURS, 0, GS_POINTS, ARMS_CASES)
      ).to.equal(true)
    })
  })

  it('should call updateWorkloadPointsCalculations when the task type is updated', function () {
    checkForDuplicateCalculation.resolves(0)
    getAdjustmentPoints.withArgs(undefined, adjustmentCategory.CMS).resolves(0)
    getAdjustmentPoints.withArgs(undefined, adjustmentCategory.GS).resolves(GS_POINTS)

    task = {
      id: 1,
      workloadReportId: REPORT_ID,
      additionalData: {
        workloadBatch: new Batch(WORKLOAD_ID, 1),
        operationType: operationTypes.UPDATE
      }
    }

    var expectedTotalPoints = (WORKLOAD_POINTS + GS_POINTS)

    return calculateWorkloadPoints.execute(task).then(function () {
      expect(
        updateWorkloadPointsCalculationsStub.calledWith(REPORT_ID, WORKLOAD_POINTS_ID, T2A_WORKLOAD_POINTS_ID, WORKLOAD_ID, expectedTotalPoints, SDR_POINTS, SDR_POINTS,
          PAROM_POINTS, NOMINAL_TARGET, AVAILABLE_POINTS, CONTRACTED_HOURS, REDUCTION_HOURS, 0, GS_POINTS, ARMS_CASES)
      ).to.equal(true)
    })
  })
})

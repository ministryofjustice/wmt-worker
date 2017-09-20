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

var calculateWorkloadPoints
var getWorkloadsStub
var probationRulesStub
var getPointsConfigurationStub
var getOffenderManagerTypeIdStub
var insertWorkloadPointsCalculationsStub
var getAppReductions
var getContractedHours
var task

describe('services/workers/calculate-workload-points', function () {
  beforeEach(function () {
    getWorkloadsStub = sinon.stub()
    getAppReductions = sinon.stub()
    getContractedHours = sinon.stub()
    getPointsConfigurationStub = sinon.stub()
    getOffenderManagerTypeIdStub = sinon.stub()
    insertWorkloadPointsCalculationsStub = sinon.stub()

    probationRulesStub = {}
    probationRulesStub.calculateWorkloadPoints = sinon.stub()
    probationRulesStub.calculateWorkloadPoints = sinon.stub()
    probationRulesStub.calculateNominalTarget = sinon.stub()
    probationRulesStub.calculateParomPoints = sinon.stub()
    probationRulesStub.calculateSdrConversionPoints = sinon.stub()
    probationRulesStub.calculateAvailablePoints = sinon.stub()

    task = {id: 1,
      additionalData: {
        workloadReportId: REPORT_ID,
        workloadBatch: new Batch(WORKLOAD_ID, BATCH_SIZE),
        operationType: wpcOperation.INSERT
      }}

    calculateWorkloadPoints = proxyquire('../../../../app/services/workers/calculate-workload-points', {
      '../log': { info: function (message) {}, error: function (message) {} },
      '../data/get-app-workloads': getWorkloadsStub,
      '../data/get-workload-points-configuration': getPointsConfigurationStub,
      '../data/get-offender-manager-type-id': getOffenderManagerTypeIdStub,
      '../data/get-app-reductions': getAppReductions,
      '../data/get-contracted-hours': getContractedHours,
      '../data/insert-workload-points-calculation': insertWorkloadPointsCalculationsStub,
      'wmt-probation-rules': probationRulesStub
    })
    getContractedHours.resolves(CONTRACTED_HOURS)
  })

  it('calls the get workloads promise correctly', function (done) {
    getAppReductions.resolves(REDUCTION_HOURS)
    getWorkloadsStub.resolves([{values: sinon.stub(), id: WORKLOAD_ID}])
    getOffenderManagerTypeIdStub.resolves(WORKLOAD_ID)
    getPointsConfigurationStub.resolves({values: pointsHelper.getCaseTypeWeightings(), id: WORKLOAD_ID})
    calculateWorkloadPoints.execute(task).then(function () {
      expect(getWorkloadsStub.calledWith(WORKLOAD_ID, MAX_ID, BATCH_SIZE)).to.equal(true)
      done()
    })
  })

  it('calls the get workloads promise correctly with a batchSize of 1', function (done) {
    task = {id: 1,
      additionalData: {
        workloadReportId: REPORT_ID,
        workloadBatch: new Batch(WORKLOAD_ID, 1),
        operationType: wpcOperation.INSERT
      }}
    getAppReductions.resolves(REDUCTION_HOURS)
    getWorkloadsStub.resolves([{values: sinon.stub(), id: WORKLOAD_ID}])
    getOffenderManagerTypeIdStub.resolves(WORKLOAD_ID)
    getPointsConfigurationStub.resolves({values: pointsHelper.getCaseTypeWeightings(), id: WORKLOAD_ID})
    var maxId = 10
    var batchSize = 1
    calculateWorkloadPoints.execute(task).then(function () {
      expect(getWorkloadsStub.calledWith(WORKLOAD_ID, maxId, batchSize)).to.equal(true)
      done()
    })
  })

  it('retrieves the points configuration', function (done) {
    getAppReductions.resolves(REDUCTION_HOURS)
    getWorkloadsStub.resolves([{values: sinon.stub(), id: WORKLOAD_ID}])
    getOffenderManagerTypeIdStub.resolves(WORKLOAD_ID)
    getPointsConfigurationStub.resolves({values: pointsHelper.getCaseTypeWeightings(), id: WORKLOAD_ID})
    calculateWorkloadPoints.execute(task).then(function () {
      expect(getPointsConfigurationStub.called).to.equal(true)
      done()
    })
  })

  it('calls calculateSdrConversionPoints', function (done) {
    getAppReductions.resolves(REDUCTION_HOURS)
    insertWorkloadPointsCalculationsStub.resolves()
    getOffenderManagerTypeIdStub.resolves(WORKLOAD_ID)
    getPointsConfigurationStub.resolves({values: pointsHelper.getCaseTypeWeightings(), id: WORKLOAD_ID})
    getWorkloadsStub.resolves([{values: sinon.stub(), id: WORKLOAD_ID}])

    calculateWorkloadPoints.execute(task).then(function () {
      expect(probationRulesStub.calculateSdrConversionPoints.called).to.equal(true)
      done()
    })
  })
})

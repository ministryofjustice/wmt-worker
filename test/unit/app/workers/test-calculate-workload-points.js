const expect = require('chai').expect
const proxyquire = require('proxyquire')
const sinon = require('sinon')
require('sinon-bluebird')
const pointsHelper = require('wmt-probation-rules').pointsHelper

const Batch = require('../../../../app/services/domain/batch')

const WORKLOAD_ID = 10
const BATCH_SIZE = 20
const REPORT_ID = 30
const REDUCTION_HOURS = 7

var calculateWorkloadPoints
var getWorkloadsStub
var probationRulesStub
var getPointsConfigurationStub
var getOffenderManagerTypeIdStub
var insertWorkloadPointsCalculationsStub
var getAppReductions
var task

describe('services/workers/calculate-workload-points', function () {
  beforeEach(function () {
    getWorkloadsStub = sinon.stub()
    getAppReductions = sinon.stub()
    getPointsConfigurationStub = sinon.stub()
    getOffenderManagerTypeIdStub = sinon.stub()
    insertWorkloadPointsCalculationsStub = sinon.stub()

    probationRulesStub = {}
    probationRulesStub.calculateWorkloadPoints = sinon.stub()
    probationRulesStub.calculateTotalWorkloadPoints = sinon.stub()
    probationRulesStub.calculateNominalTarget = sinon.stub()
    probationRulesStub.calculateParomPoints = sinon.stub()
    probationRulesStub.calculateSdrConversionPoints = sinon.stub()
    probationRulesStub.calculateAvailablePoints = sinon.stub()

    task = {id: 1,
      additionalData: {
        workloadReportId: REPORT_ID,
        workloadBatch: new Batch(WORKLOAD_ID, BATCH_SIZE)
      }}

    calculateWorkloadPoints = proxyquire('../../../../app/services/workers/calculate-workload-points', {
      '../log': { info: function (message) {}, error: function (message) {} },
      '../../services/data/get-app-workloads': getWorkloadsStub,
      '../../services/data/get-workload-points-configuration': getPointsConfigurationStub,
      '../../services/data/get-offender-manager-type-id': getOffenderManagerTypeIdStub,
      '../../services/data/get-app-reductions': getAppReductions,
      '../../services/data/insert-workload-points-calculation': insertWorkloadPointsCalculationsStub,
      'wmt-probation-rules': probationRulesStub
    })
  })

  it('calls the get workloads promise correctly', function (done) {
    getAppReductions.resolves(REDUCTION_HOURS)
    getWorkloadsStub.resolves([{values: sinon.stub(), id: WORKLOAD_ID}])
    getOffenderManagerTypeIdStub.resolves(WORKLOAD_ID)
    getPointsConfigurationStub.resolves({values: pointsHelper.getCaseTypeWeightings(), id: WORKLOAD_ID})
    calculateWorkloadPoints.execute(task).then(function () {
      expect(getWorkloadsStub.calledWith(WORKLOAD_ID, BATCH_SIZE)).to.equal(true)
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

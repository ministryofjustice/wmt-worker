const expect = require('chai').expect
const proxyquire = require('proxyquire')
const sinon = require('sinon')
require('sinon-bluebird')

const Batch = require('../../../../app/services/domain/batch')
const operationTypes = require('../../../../app/constants/calculation-tasks-operation-type')

const STAGING_ID = 10
const BATCH_SIZE = 20
const MAX_ID = STAGING_ID + BATCH_SIZE - 1
const REPORT_ID = 30
const REDUCTION_HOURS = 7
const CONTRACTED_HOURS = 37.5
const WORKLOAD_OWNER_ID = 5
const COURT_REPORT_ID = 11
const POINTS_CONFIG_ID = 12
const INSERT_ID = 14

var expectedCourtReportsCalculation = {
  workloadReportId: REPORT_ID,
  workloadPointsId: POINTS_CONFIG_ID,
  courtReportsId: COURT_REPORT_ID,
  contractedHours: CONTRACTED_HOURS,
  reductionHours: REDUCTION_HOURS
}

var courtReports = {workloadOwnerId: WORKLOAD_OWNER_ID, id: COURT_REPORT_ID}

var courtReportsCalculations
var getAppCourtReports
var insertCourtReportsCalculations
var updateCourtReportsCalculations
var getAppReductions
var getContractedHours
var getPointsConfigurationStub

describe('services/workers/court-reports-calculations', function () {
  beforeEach(function () {
    getAppCourtReports = sinon.stub()
    getAppReductions = sinon.stub()
    getContractedHours = sinon.stub()
    insertCourtReportsCalculations = sinon.stub()
    updateCourtReportsCalculations = sinon.stub()
    getPointsConfigurationStub = sinon.stub()

    courtReportsCalculations = proxyquire('../../../../app/services/workers/court-reports-calculations', {
      '../log': { info: function (message) {}, error: function (message) {} },
      '../data/get-app-court-reports': getAppCourtReports,
      '../data/get-app-reduction-hours': getAppReductions,
      '../data/get-workload-points-configuration': getPointsConfigurationStub,
      '../data/get-contracted-hours': getContractedHours,
      '../data/insert-court-reports-calculation': insertCourtReportsCalculations,
      '../data/update-court-reports-calculation': updateCourtReportsCalculations
    })
    getAppCourtReports.resolves([courtReports])
    getPointsConfigurationStub.resolves({id: POINTS_CONFIG_ID})
    getAppReductions.resolves(REDUCTION_HOURS)
    getContractedHours.resolves(CONTRACTED_HOURS)
    insertCourtReportsCalculations.resolves(INSERT_ID)
    updateCourtReportsCalculations.resolves(INSERT_ID)
  })

  it('should call on services and call insert court-reports-calculation', function () {
    var task = {
      id: 1,
      workloadReportId: REPORT_ID,
      additionalData: {
        workloadBatch: new Batch(STAGING_ID, BATCH_SIZE),
        operationType: operationTypes.INSERT
      }
    }

    return courtReportsCalculations.execute(task)
    .then(function () {
      expect(getAppCourtReports.calledWith(STAGING_ID, MAX_ID, REPORT_ID)).to.be.equal(true)
      expect(getPointsConfigurationStub.called).to.be.equal(true)
      expect(getAppReductions.calledWith(WORKLOAD_OWNER_ID)).to.be.equal(true)
      expect(getContractedHours.calledWith(WORKLOAD_OWNER_ID)).to.be.equal(true)
      expect(insertCourtReportsCalculations.calledWith(expectedCourtReportsCalculation)).to.be.equal(true)
      expect(updateCourtReportsCalculations.called).to.be.equal(false)
    })
  })

  it('should call on services and call update court-reports-calculation', function () {
    var task = {
      id: 1,
      workloadReportId: REPORT_ID,
      additionalData: {
        workloadBatch: new Batch(STAGING_ID, BATCH_SIZE),
        operationType: operationTypes.UPDATE
      }
    }

    return courtReportsCalculations.execute(task)
    .then(function () {
      expect(getAppCourtReports.calledWith(STAGING_ID, MAX_ID, REPORT_ID)).to.be.equal(true)
      expect(getPointsConfigurationStub.called).to.be.equal(true)
      expect(getAppReductions.calledWith(WORKLOAD_OWNER_ID)).to.be.equal(true)
      expect(getContractedHours.calledWith(WORKLOAD_OWNER_ID)).to.be.equal(true)
      expect(insertCourtReportsCalculations.called).to.be.equal(false)
      expect(updateCourtReportsCalculations.calledWith(expectedCourtReportsCalculation)).to.be.equal(true)
    })
  })
})

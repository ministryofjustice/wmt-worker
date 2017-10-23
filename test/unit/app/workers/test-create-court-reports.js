const expect = require('chai').expect
const proxyquire = require('proxyquire')
const sinon = require('sinon')
require('sinon-bluebird')

const Task = require('../../../../app/services/domain/task')
const taskType = require('../../../../app/constants/task-type')
const taskStatus = require('../../../../app/constants/task-status')
const submittingAgent = require('../../../../app/constants/task-submitting-agent')

var createCourtReports
var getStagingCourtReporters
var insertWorkloadOwnerAndDependencies
var insertCourtReports
var createNewTasks
var probationRulesStub

var workloadOwnerId = 1
var courtReportsId = 2

var task = {
  additionalData: {
    batchSize: 3,
    startingId: 4
  },
  workloadReportId: 5
}

var endingStagingId = task.additionalData.startingId + (task.additionalData.batchSize - 1)
var stagingCourtReports = [
  {
    caseSummary: 'This is a fake summary'
  }
]
var appCourtReports = 'This is a fake app court reports'

var nextTask = new Task(
  undefined,
  submittingAgent.WORKER,
  taskType.PROCESS_REDUCTIONS_COURT_REPORTERS,
  task.additionalData,
  task.workloadReportId,
  undefined,
  undefined,
  taskStatus.PENDING
)

describe('services/workers/create-court-reports', function () {
  beforeEach(function () {
    getStagingCourtReporters = sinon.stub()
    insertWorkloadOwnerAndDependencies = sinon.stub()
    insertCourtReports = sinon.stub()
    probationRulesStub = {}
    probationRulesStub.mapCourtReports = sinon.stub()
    createNewTasks = sinon.stub()

    createCourtReports = proxyquire('../../../../app/services/workers/create-court-reports', {
      '../log': { info: function (message) {}, error: function (message) {} },
      '../data/get-staging-court-reporters': getStagingCourtReporters,
      '../insert-workload-owner-and-dependencies': insertWorkloadOwnerAndDependencies,
      '../data/insert-app-court-reports': insertCourtReports,
      'wmt-probation-rules': probationRulesStub,
      '../data/create-tasks': createNewTasks
    })
  })

  it('should call on services', function () {
    getStagingCourtReporters.resolves(stagingCourtReports)
    insertWorkloadOwnerAndDependencies.resolves(workloadOwnerId)
    insertCourtReports.resolves(courtReportsId)
    createNewTasks.resolves()
    probationRulesStub.mapCourtReports.returns(appCourtReports)

    return createCourtReports.execute(task)
    .then(function (result) {
      expect(getStagingCourtReporters.calledWith([task.additionalData.startingId, endingStagingId])).to.be.equal(true)
      expect(insertWorkloadOwnerAndDependencies.calledWith(stagingCourtReports.caseSummary)).to.be.equal(true)
      expect(insertCourtReports.calledWith(appCourtReports)).to.be.equal(true)
      expect(probationRulesStub.mapCourtReports.calledWith(stagingCourtReports, workloadOwnerId, task.workloadReportId))
      expect(createNewTasks.calledWith([nextTask])).to.be.eql(true)
    })
  })
})

const expect = require('chai').expect
const proxyquire = require('proxyquire')
const sinon = require('sinon')
require('sinon-bluebird')

const Task = require('../../../../app/services/domain/task')
const taskType = require('../../../../app/constants/task-type')
const taskStatus = require('../../../../app/constants/task-status')
const submittingAgent = require('../../../../app/constants/task-submitting-agent')

var createWorkload
var parseStagingWorkload
var insertWorkloadOwnerAndDependencies
var insertWorkload
var createNewTasks
var probationRulesStub

var workloadOwnerId = 1
var workloadId = 2

var task = {
  additionalData: {
    batchSize: 3,
    startingId: 4
  },
  workloadReportId: 5
}

var endingStagingId = task.additionalData.startingId + (task.additionalData.batchSize - 1)
var stagingWorkload = [
  {
    casesSummary: 'This is a fake summary',
    caseDetails: 'This is a fake caseDetails'
  }
]
var appWorkload = 'This is a fake app workload'

var nextTask = new Task(
  undefined,
  submittingAgent.WORKER,
  taskType.PROCESS_REDUCTIONS,
  task.additionalData,
  task.workloadReportId,
  undefined,
  undefined,
  taskStatus.PENDING
  )

describe('services/workers/create-workload', function () {
  beforeEach(function () {
    parseStagingWorkload = sinon.stub()
    insertWorkloadOwnerAndDependencies = sinon.stub()
    insertWorkload = sinon.stub()
    probationRulesStub = {}
    probationRulesStub.mapWorkload = sinon.stub()
    createNewTasks = sinon.stub()

    createWorkload = proxyquire('../../../../app/services/workers/create-workload', {
      '../log': { info: function (message) {}, error: function (message) {} },
      '../data/parse-staging-workload': parseStagingWorkload,
      '../insert-workload-owner-and-dependencies': insertWorkloadOwnerAndDependencies,
      '../data/insert-app-workload': insertWorkload,
      'wmt-probation-rules': probationRulesStub,
      '../data/create-tasks': createNewTasks
    })
  })

  it('should call on services', function () {
    parseStagingWorkload.resolves(stagingWorkload)
    insertWorkloadOwnerAndDependencies.resolves(workloadOwnerId)
    insertWorkload.resolves(workloadId)
    createNewTasks.resolves()
    probationRulesStub.mapWorkload.returns(appWorkload)

    return createWorkload.execute(task)
    .then(function (result) {
      expect(parseStagingWorkload.calledWith([task.additionalData.startingId, endingStagingId])).to.be.equal(true)
      expect(insertWorkloadOwnerAndDependencies.calledWith(stagingWorkload[0].casesSummary)).to.be.equal(true)
      expect(insertWorkload.calledWith(appWorkload, stagingWorkload[0].caseDetails)).to.be.equal(true)
      expect(createNewTasks.calledWith([nextTask])).to.be.eql(true)
    })
  })
})

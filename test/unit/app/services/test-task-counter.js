const expect = require('chai').expect
const proxyquire = require('proxyquire')
const sinon = require('sinon')
require('sinon-bluebird')
const taskStatus = require('../../../../app/constants/task-status')
const taskType = require('../../../../app/constants/task-type')

var getTasks
var updateWorkloadReportStatus
var callWebRefreshEndpoint
var taskCounter

var defaultTask = { id: 1, workload_report_id: 1, status: taskStatus.COMPLETE }

var currentTask = Object.assign({}, defaultTask, { type: taskType.PROCESS_IMPORT })

var taskList = [
  defaultTask,
  Object.assign({}, defaultTask, {id: 2}),
  Object.assign({}, defaultTask, {id: 3, status: taskStatus.INPROGRESS}),
  Object.assign({}, defaultTask, {id: 4, status: taskStatus.FAILED})
]

var completedTaskList = [
  defaultTask,
  Object.assign({}, defaultTask, {id: 2}),
  Object.assign({}, defaultTask, {id: 3})
]

describe('services/task-counter', function () {
  before(function (done) {
    getTasks = sinon.stub()
    updateWorkloadReportStatus = sinon.stub()
    callWebRefreshEndpoint = sinon.stub()

    taskCounter = proxyquire('../../../../app/services/task-counter', {
      './data/get-tasks': getTasks,
      './data/update-workload-report-with-status': updateWorkloadReportStatus,
      './refresh-web-org-hierarchy': callWebRefreshEndpoint
    })
    done()
  })

  it('should call get-tasks', function (done) {
    getTasks.resolves(taskList)
    taskCounter(currentTask).then(function () {
      expect(getTasks.called).to.be.true //eslint-disable-line
      done()
    })
  })

  it('should do nothing when there are pending, in progress or failed tests', function (done) {
    getTasks.resolves(taskList)
    updateWorkloadReportStatus.resolves({})
    taskCounter(currentTask).then(function () {
      expect(updateWorkloadReportStatus.called).to.be.false //eslint-disable-line
      expect(callWebRefreshEndpoint.called).to.be.false //eslint-disable-line
      done()
    })
  })

  it('should call update-workload-report-with-status and refresh-web-org-hierarchy when there are no pending, in progress or failing tasks', function (done) {
    getTasks.resolves(completedTaskList)
    updateWorkloadReportStatus.resolves({})
    taskCounter(currentTask).then(function () {
      expect(updateWorkloadReportStatus.calledWith(1, taskStatus.COMPLETE)).to.be.true //eslint-disable-line
      expect(callWebRefreshEndpoint.called).to.be.true //eslint-disable-line
      done()
    })
  })
})

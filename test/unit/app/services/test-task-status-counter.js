const expect = require('chai').expect
const proxyquire = require('proxyquire')
const sinon = require('sinon')

const taskStatus = require('../../../../app/constants/task-status')
const taskType = require('../../../../app/constants/task-type')

let getTasks
let updateWorkloadReportStatus
let taskStatusCounter

const defaultTask = { id: 1, workload_report_id: 1, status: taskStatus.COMPLETE }

const currentTask = Object.assign({}, defaultTask, { type: taskType.PROCESS_IMPORT })

const taskList = [
  defaultTask,
  Object.assign({}, defaultTask, { id: 2 }),
  Object.assign({}, defaultTask, { id: 3, status: taskStatus.INPROGRESS }),
  Object.assign({}, defaultTask, { id: 4, status: taskStatus.FAILED })
]

const completedTaskList = [
  defaultTask,
  Object.assign({}, defaultTask, { id: 2 }),
  Object.assign({}, defaultTask, { id: 3 })
]

describe('services/task-counter', function () {
  before(function (done) {
    getTasks = sinon.stub()
    updateWorkloadReportStatus = sinon.stub()

    taskStatusCounter = proxyquire('../../../../app/services/task-status-counter', {
      './data/get-tasks': getTasks,
      './data/update-workload-report-with-status': updateWorkloadReportStatus
    })
    done()
  })

  it('should call get-tasks', function (done) {
    getTasks.resolves(taskList)
    taskStatusCounter(currentTask).then(function () {
      expect(getTasks.called).to.be.true //eslint-disable-line
      done()
    })
  })

  it('should return the correct totals for the task statuses', function (done) {
    getTasks.resolves(taskList)
    taskStatusCounter(currentTask).then(function (totals) {
      expect(totals.numPending).to.eql(0)
      expect(totals.numInProgress).to.eql(1)
      expect(totals.numFailed).to.eql(1)
      done()
    })
  })

  it('should return the all zeros when all tasks are completed', function (done) {
    getTasks.resolves(completedTaskList)
    taskStatusCounter(currentTask).then(function (totals) {
      expect(totals.numPending).to.eql(0)
      expect(totals.numInProgress).to.eql(0)
      expect(totals.numFailed).to.eql(0)
      done()
    })
  })
})

const proxyquire = require('proxyquire')
const sinon = require('sinon')

const expect = require('chai').expect

const taskStatus = require('../../../../app/constants/task-status')
const taskType = require('../../../../app/constants/task-type')
const submittingAgent = require('../../../../app/constants/task-submitting-agent')
const Task = require('../../../../app/services/domain/task')
const dateHelper = require('../../../helpers/data/date-helper')

let reductionsWorker
let getOpenReductions
let updateStatus
let createNewTasks
const relativeFilePath = 'services/workers/reductions-worker'

const reductions = [
  {
    id: 1,
    effectiveFrom: dateHelper.yesterday,
    effectiveTo: dateHelper.tomorrow,
    status: null
  }
]

const task = new Task(
  undefined,
  submittingAgent.WORKER,
  taskType.PROCESS_REDUCTIONS,
  {
    workloadBatch: { startingId: 1, batchSize: 5 },
    operationType: 'UPDATE'
  },
  123,
  undefined,
  undefined,
  taskStatus.PENDING
)

const adjustmentsTask = new Task(
  undefined,
  submittingAgent.WORKER,
  taskType.PROCESS_ADJUSTMENTS,
  task.additionalData,
  task.workloadReportId,
  undefined,
  undefined,
  taskStatus.AWAITING_DUPLICATE_CHECK
)

describe(relativeFilePath, function () {
  beforeEach(function () {
    getOpenReductions = sinon.stub().resolves(reductions)
    updateStatus = {
      updateReductionStatuses: sinon.stub().resolves()
    }
    createNewTasks = sinon.stub().resolves()
    reductionsWorker = proxyquire('../../../../app/' + relativeFilePath, {
      '../log': { info: function (message) { } },
      '../data/get-open-reductions': getOpenReductions,
      '../update-adjustment-reduction-status': updateStatus,
      '../data/create-tasks': createNewTasks
    })
  })

  it('should call the database to get the reductions and call updateReductionStatuses with the result', function () {
    return reductionsWorker.execute(task).then(function () {
      expect(getOpenReductions.called).to.be.equal(true)
      expect(updateStatus.updateReductionStatuses.calledWith(reductions)).to.be.equal(true)
    })
  })

  it('should call createNewTasks with the correct adjustments task array', function () {
    return reductionsWorker.execute(task).then(function () {
      expect(createNewTasks.calledWith([adjustmentsTask])).to.be.equal(true)
    })
  })
})

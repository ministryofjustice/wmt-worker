const proxyquire = require('proxyquire')
const sinon = require('sinon')
require('sinon-bluebird')
const expect = require('chai').expect

const taskStatus = require('../../../../app/constants/task-status')
const taskType = require('../../../../app/constants/task-type')
const submittingAgent = require('../../../../app/constants/task-submitting-agent')
const Task = require('../../../../app/services/domain/task')
const dateHelper = require('../../../helpers/data/date-helper')

var reductionsWorker
var getOpenReductions
var updateReductionStatuses
var createNewTasks
var relativeFilePath = 'services/workers/reductions-worker'

var reductions = [
  {
    id: 1,
    effectiveFrom: dateHelper.yesterday,
    effectiveTo: dateHelper.tomorrow,
    status: null
  }
]

var task = new Task(
  undefined,
  'WORKER',
  'PROCESS-REDUCTIONS',
  {
    workloadBatch: { startingId: 1, batchSize: 5 },
    operationType: 'UPDATE'},
  123,
  undefined,
  undefined,
  'PENDING'
)

var adjustmentsTask = new Task(
  undefined,
  submittingAgent.WORKER,
  taskType.PROCESS_ADJUSTMENTS,
  task.additionalData,
  task.workloadReportId,
  undefined,
  undefined,
  taskStatus.PENDING
)

describe(relativeFilePath, function () {
  beforeEach(function () {
    getOpenReductions = sinon.stub()
    updateReductionStatuses = sinon.stub()
    createNewTasks = sinon.stub()
    reductionsWorker = proxyquire('../../../../app/' + relativeFilePath, {
      '../log': { info: function (message) { } },
      '../data/get-open-reductions': getOpenReductions,
      '../update-reduction-statuses': updateReductionStatuses,
      '../data/create-tasks': createNewTasks
    })
  })

  it('should call the database to get the reductions and call updateReductionStatuses with the result', function () {
    getOpenReductions.resolves(reductions)
    updateReductionStatuses.resolves()
    createNewTasks.resolves()
    return reductionsWorker.execute(task).then(function () {
      expect(getOpenReductions.called).to.be.equal(true)
      expect(updateReductionStatuses.calledWith(reductions)).to.be.equal(true)
    })
  })

  it('should call createNewTasks with the correct adjustments task array', function () {
    getOpenReductions.resolves(reductions)
    updateReductionStatuses.resolves()
    createNewTasks.resolves()
    return reductionsWorker.execute(task).then(function () {
      expect(createNewTasks.calledWith([adjustmentsTask])).to.be.equal(true)
    })
  })
})

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
var getOpenReductionsForCourtReporters
var updateStatus
var createNewTasks
var relativeFilePath = 'services/workers/court-reporters-reductions-worker'

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
  submittingAgent.WORKER,
  taskType.PROCESS_REDUCTIONS_COURT_REPORTERS,
  { startingId: 1, batchSize: 5 },
  123,
  undefined,
  undefined,
  taskStatus.PENDING
)

var courtReportsCalculationTask = new Task(
  undefined,
  submittingAgent.WORKER,
  taskType.COURT_REPORTS_CALCULATION,
  {
    workloadBatch: { startingId: 1, batchSize: 5 },
    operationType: 'INSERT'},
  task.workloadReportId,
  undefined,
  undefined,
  taskStatus.PENDING
)

describe(relativeFilePath, function () {
  beforeEach(function () {
    getOpenReductionsForCourtReporters = sinon.stub().resolves(reductions)
    updateStatus = {
      updateReductionStatuses: sinon.stub().resolves()
    }
    createNewTasks = sinon.stub().resolves()
    reductionsWorker = proxyquire('../../../../app/' + relativeFilePath, {
      '../log': { info: function (message) { } },
      '../data/get-open-reductions-for-court-reporters': getOpenReductionsForCourtReporters,
      '../update-adjustment-reduction-status': updateStatus,
      '../data/create-tasks': createNewTasks
    })
  })

  it('should call the database to get the reductions and call updateReductionStatuses with the result', function () {
    return reductionsWorker.execute(task).then(function () {
      expect(getOpenReductionsForCourtReporters.calledWith(
        task.additionalData.startingId,
        task.additionalData.startingId + task.additionalData.batchSize - 1,
        task.workloadReportId)).to.be.equal(true)
      expect(updateStatus.updateReductionStatuses.calledWith(reductions)).to.be.equal(true)
    })
  })

  it('should call createNewTasks with the correct court reports calculation task array', function () {
    return reductionsWorker.execute(task).then(function () {
      expect(createNewTasks.calledWith([courtReportsCalculationTask])).to.be.equal(true)
    })
  })
})

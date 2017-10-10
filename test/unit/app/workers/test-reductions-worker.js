const proxyquire = require('proxyquire')
const sinon = require('sinon')
require('sinon-bluebird')
const expect = require('chai').expect

const reductionStatus = require('../../../../app/constants/reduction-status')
const Task = require('../../../../app/services/domain/task')
const dateHelper = require('../../../helpers/data/date-helper')

var reductionsWorker
var getOpenReductions
var updateReductionStatusByIds
var createNewTasks
var relativeFilePath = 'services/workers/reductions-worker'

var activeReduction = {
  id: 1,
  effectiveFrom: dateHelper.yesterday,
  effectiveTo: dateHelper.tomorrow,
  status: null
}

var scheduledReduction = {
  id: 2,
  effectiveFrom: dateHelper.tomorrow,
  effectiveTo: dateHelper.dayAfterTomorrow,
  status: null
}

var archivedReduction = {
  id: 3,
  effectiveFrom: dateHelper.dayBeforeYesterday,
  effectiveTo: dateHelper.yesterday,
  status: null
}

var existingActiveReduction = {
  id: 1,
  effectiveFrom: dateHelper.yesterday,
  effectiveTo: dateHelper.tomorrow,
  status: reductionStatus.ACTIVE
}

var reductions = [activeReduction, scheduledReduction, archivedReduction, existingActiveReduction]
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

describe(relativeFilePath, function () {
  beforeEach(function () {
    getOpenReductions = sinon.stub()
    updateReductionStatusByIds = sinon.stub()
    createNewTasks = sinon.stub()
    reductionsWorker = proxyquire('../../../../app/' + relativeFilePath, {
      '../log': { info: function (message) { } },
      '../data/get-open-reductions': getOpenReductions,
      '../data/update-reduction-status-by-ids': updateReductionStatusByIds,
      '../data/create-tasks': createNewTasks
    })
  })

  it('should call the database to get the reductions assign statuses and call to update database', function () {
    getOpenReductions.resolves(reductions)
    updateReductionStatusByIds.resolves(1)
    createNewTasks.resolves()
    return reductionsWorker.execute(task).then(function () {
      expect(getOpenReductions.called).to.be.equal(true)
      expect(updateReductionStatusByIds.calledWith([activeReduction.id], 'ACTIVE')).to.be.equal(true)
      expect(updateReductionStatusByIds.calledWith([scheduledReduction.id], 'SCHEDULED')).to.be.equal(true)
      expect(updateReductionStatusByIds.calledWith([archivedReduction.id], 'ARCHIVED')).to.be.equal(true)
    })
  })
})

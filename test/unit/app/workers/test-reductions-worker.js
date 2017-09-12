const proxyquire = require('proxyquire')
const sinon = require('sinon')
require('sinon-bluebird')
const expect = require('chai').expect

var reductionsWorker
var getAllOpenReductions
var updateReductionStatusByIds
var createNewTasks
var relativeFilePath = 'services/workers/reductions-worker'

var today = new Date()

var yesterday = new Date(today)
yesterday.setDate(today.getDate() - 1)

var dayBeforeYesterday = new Date(today)
dayBeforeYesterday.setDate(today.getDate() - 2)

var tomorrow = new Date(today)
tomorrow.setDate(today.getDate() + 1)

var dayAfterTomorrow = new Date(today)
dayAfterTomorrow.setDate(today.getDate() + 2)

var activeReduction = {
  id: 1,
  effectiveFrom: yesterday,
  effectiveTo: tomorrow,
  status: null
}

var scheduledReduction = {
  id: 2,
  effectiveFrom: tomorrow,
  effectiveTo: dayAfterTomorrow,
  status: null
}

var archivedReduction = {
  id: 3,
  effectiveFrom: dayBeforeYesterday,
  effectiveTo: yesterday,
  status: null
}

var reductions = [activeReduction, scheduledReduction, archivedReduction]

describe(relativeFilePath, function () {
  beforeEach(function () {
    getAllOpenReductions = sinon.stub()
    updateReductionStatusByIds = sinon.stub()
    createNewTasks = sinon.stub()
    reductionsWorker = proxyquire('../../../../app/' + relativeFilePath, {
      '../log': { info: function (message) { } },
      '../data/get-all-open-reductions': getAllOpenReductions,
      '../data/update-reduction-status-by-ids': updateReductionStatusByIds,
      '../data/create-tasks': createNewTasks
    })
  })

  it('should call the database to get the reductions assign statuses and call to update databse', function () {
    getAllOpenReductions.resolves(reductions)
    updateReductionStatusByIds.resolves(1)
    createNewTasks.resolves()
    return reductionsWorker.execute({}).then(function () {
      expect(getAllOpenReductions.called).to.be.equal(true)
      expect(updateReductionStatusByIds.calledWith([activeReduction.id], 'ACTIVE')).to.be.equal(true)
      expect(updateReductionStatusByIds.calledWith([scheduledReduction.id], 'SCHEDULED')).to.be.equal(true)
      expect(updateReductionStatusByIds.calledWith([archivedReduction.id], 'ARCHIVED')).to.be.equal(true)

      expect(createNewTasks.called).to.be.equal(true)
    })
  })
})

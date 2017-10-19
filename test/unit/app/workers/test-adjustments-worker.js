const proxyquire = require('proxyquire')
const sinon = require('sinon')
require('sinon-bluebird')
const expect = require('chai').expect
const assert = require('chai').assert

const adjustmentStatus = require('../../../../app/constants/adjustment-status')
const Task = require('../../../../app/services/domain/task')
const dateHelper = require('../../../helpers/data/date-helper')

var adjustmentsWorker
var statusUpdater
var createNewTasks
var stagingAdjustmentsMapper
var getAppAdjustments
var updateAdjustmentEffectiveTo
var insertAdjustment
var relativeFilePath = 'services/workers/adjustments-worker'

var activeAdjustment = {
  id: 1,
  effectiveFrom: dateHelper.yesterday,
  effectiveTo: dateHelper.tomorrow,
  status: null
}

var scheduledAdjustment = {
  id: 2,
  effectiveFrom: dateHelper.tomorrow,
  effectiveTo: dateHelper.dayAfterTomorrow,
  status: null
}

var archivedAdjustment = {
  id: 3,
  effectiveFrom: dateHelper.dayBeforeYesterday,
  effectiveTo: dateHelper.yesterday,
  status: null
}

var existingActiveAdjustment = {
  id: 1,
  effectiveFrom: dateHelper.yesterday,
  effectiveTo: dateHelper.tomorrow,
  status: adjustmentStatus.ACTIVE
}

var adjustments = [activeAdjustment, scheduledAdjustment, archivedAdjustment, existingActiveAdjustment]

var existingContactId = 12
var existingContactOmId = 31
var existingOmId = 43
var changedOmId = 55
var gsContactId = 99

var cmsAdjustments = [
  {
    contactId: existingContactId,
    workloadOwnerId: existingContactOmId,
    points: 12,
    adjustmentReasonId: 1,
    effectiveFrom: 'testfrom',
    effetiveTo: 'testto',
    status: adjustmentStatus.ACTIVE
  },
  {
    contactId: existingContactId,
    workloadOwnerId: existingOmId,
    points: -12,
    adjustmentReasonId: 1,
    effectiveFrom: 'testfrom',
    effetiveTo: 'testto',
    status: adjustmentStatus.ACTIVE
  }
]

var gsAdjustments = [
  {
    contactId: gsContactId,
    workloadOwnerId: existingOmId,
    points: -6,
    adjsutmentReasonId: 2,
    effectiveFrom: 'testfrom',
    effetiveTo: 'testto',
    status: adjustmentStatus.ACTIVE
  }
]

var updateTime = new Date()
updateTime.setHours(0, 0, 0, 0)

var task = new Task(
  undefined,
  'WORKER',
  'PROCESS-ADJUSTMENTS',
  {
    workloadBatch: { startingId: 1, batchSize: 5 }
  },
  123,
  undefined,
  undefined,
  'PENDING'
)

var adjustmentRow = {
  id: 1,
  contactId: existingContactId,
  points: 1,
  workloadOwnerId: existingContactOmId,
  effectiveFrom: dateHelper.yesterday,
  effectiveTo: dateHelper.dayAfterTomorrow,
  status: adjustmentStatus.ACTIVE
}

describe(relativeFilePath, function () {
  beforeEach(function () {
    statusUpdater = {
      updateAdjustmentStatuses: sinon.stub().resolves()
    }
    createNewTasks = sinon.stub().resolves()
    getAppAdjustments = sinon.stub()
    updateAdjustmentEffectiveTo = sinon.stub().resolves()
    insertAdjustment = sinon.stub().resolves()
    stagingAdjustmentsMapper = {
      mapCmsAdjustments: sinon.stub(),
      mapGsAdjustments: sinon.stub()
    }

    adjustmentsWorker = proxyquire('../../../../app/' + relativeFilePath, {
      '../log': { info: function (message) { } },
      '../status-updater': statusUpdater,
      '../data/create-tasks': createNewTasks,
      '../staging-adjustments-mapper': stagingAdjustmentsMapper,
      '../data/get-app-adjustments-for-batch': getAppAdjustments,
      '../data/update-adjustment-effective-to': updateAdjustmentEffectiveTo,
      '../data/insert-adjustment': insertAdjustment
    })
  })

  it('should call the database to get the adjustments, assign statuses and call to update database', function () {
    stagingAdjustmentsMapper.mapCmsAdjustments.resolves([{id: 1}, {id: 2}, {id: 3}])
    stagingAdjustmentsMapper.mapGsAdjustments.resolves([])
    getAppAdjustments.resolves(adjustments)

    return adjustmentsWorker.execute(task).then(function () {
      expect(createNewTasks.called).to.be.equal(true)
      expect(stagingAdjustmentsMapper.mapCmsAdjustments.called).to.be.equal(true)
      expect(getAppAdjustments.called).to.be.equal(true)
      expect(updateAdjustmentEffectiveTo.called).to.be.equal(false)
      expect(insertAdjustment.called).to.be.equal(false)
    })
  })

  it('should return CMS adjustments that exist already in WMT and not update anything', function () {
    var appAdjustments = [
      adjustmentRow,
      Object.assign({}, adjustmentRow, { id: 12, points: -1, workloadOwnerId: existingOmId })
    ]

    stagingAdjustmentsMapper.mapCmsAdjustments.resolves(cmsAdjustments)
    stagingAdjustmentsMapper.mapGsAdjustments.resolves([])
    getAppAdjustments.resolves(appAdjustments)

    return adjustmentsWorker.execute(task).then(function () {
      expect(createNewTasks.called).to.be.equal(true)
      expect(stagingAdjustmentsMapper.mapCmsAdjustments.called).to.be.equal(true)
      expect(getAppAdjustments.called).to.be.equal(true)
      expect(updateAdjustmentEffectiveTo.called).to.be.equal(false)
      expect(insertAdjustment.called).to.be.equal(false)
    })
  })

  it('should return CMS adjustments that do not exist already in WMT and insert new adjustment', function () {
    stagingAdjustmentsMapper.mapCmsAdjustments.resolves(cmsAdjustments)
    stagingAdjustmentsMapper.mapGsAdjustments.resolves([])
    getAppAdjustments.resolves([])

    return adjustmentsWorker.execute(task).then(function () {
      expect(createNewTasks.called).to.be.equal(true)
      expect(stagingAdjustmentsMapper.mapCmsAdjustments.called).to.be.equal(true)
      expect(getAppAdjustments.called).to.be.equal(true)
      expect(updateAdjustmentEffectiveTo.called).to.be.equal(false)
      expect(insertAdjustment.calledWith(cmsAdjustments[0])).to.be.equal(true)
      expect(insertAdjustment.calledWith(cmsAdjustments[1])).to.be.equal(true)
    })
  })

  it('should return CMS adjustments that exist but are not in the extract and update adjustments', function () {
    var appAdjustments = [
      adjustmentRow,
      Object.assign({}, adjustmentRow, { id: 12, points: -1, workloadOwnerId: existingOmId })
    ]

    stagingAdjustmentsMapper.mapCmsAdjustments.resolves([])
    stagingAdjustmentsMapper.mapGsAdjustments.resolves([])
    getAppAdjustments.resolves(appAdjustments)

    return adjustmentsWorker.execute(task).then(function () {
      expect(createNewTasks.called).to.be.equal(true)
      expect(stagingAdjustmentsMapper.mapCmsAdjustments.called).to.be.equal(true)
      expect(getAppAdjustments.called).to.be.equal(true)
      expect(updateAdjustmentEffectiveTo.calledWith(Number(appAdjustments[0].id), updateTime)).to.be.equal(true)
      expect(updateAdjustmentEffectiveTo.calledWith(appAdjustments[1].id, updateTime)).to.be.equal(true)
      expect(insertAdjustment.called).to.be.equal(false)
    })
  })

  it('should return CMS adjustments that exist but OM key has changed and update old OM record and insert new one', function () {
    var appAdjustments = [
      adjustmentRow,
      Object.assign({}, adjustmentRow, { id: 12, points: -1, workloadOwnerId: changedOmId })
    ]

    stagingAdjustmentsMapper.mapCmsAdjustments.resolves(cmsAdjustments)
    stagingAdjustmentsMapper.mapGsAdjustments.resolves([])
    getAppAdjustments.resolves(appAdjustments)

    return adjustmentsWorker.execute(task).then(function () {
      expect(createNewTasks.called).to.be.equal(true)
      expect(stagingAdjustmentsMapper.mapCmsAdjustments.called).to.be.equal(true)
      expect(getAppAdjustments.called).to.be.equal(true)
      expect(updateAdjustmentEffectiveTo.calledWith(appAdjustments[1].id, updateTime)).to.be.equal(true)
      expect(insertAdjustment.calledWith(cmsAdjustments[1])).to.be.equal(true)
    })
  })

  it('should retrieve staging GS adjustments and insert them as a new adjustment in app when they do not exist', function () {
    stagingAdjustmentsMapper.mapCmsAdjustments.resolves([])
    stagingAdjustmentsMapper.mapGsAdjustments.resolves(gsAdjustments)
    getAppAdjustments.resolves([])

    return adjustmentsWorker.execute(task).then(function () {
      expect(createNewTasks.called).to.be.equal(true)
      expect(stagingAdjustmentsMapper.mapCmsAdjustments.called).to.be.equal(true)
      expect(stagingAdjustmentsMapper.mapGsAdjustments.called).to.be.equal(true)
      expect(getAppAdjustments.called).to.be.equal(true)
      expect(updateAdjustmentEffectiveTo.called).to.be.equal(false)
      expect(insertAdjustment.calledWith(gsAdjustments[0])).to.be.equal(true)
    })
  })

  it('should retrieve staging GS adjustments and update them in app when they exist but are not in the extract', function () {
    var appAdjustments = [
      Object.assign({}, adjustmentRow, { id: 24, points: -6, contactId: gsContactId, workloadOwnerId: existingOmId })
    ]

    stagingAdjustmentsMapper.mapCmsAdjustments.resolves([])
    stagingAdjustmentsMapper.mapGsAdjustments.resolves([])
    getAppAdjustments.resolves(appAdjustments)

    return adjustmentsWorker.execute(task).then(function () {
      expect(createNewTasks.called).to.be.equal(true)
      expect(stagingAdjustmentsMapper.mapCmsAdjustments.called).to.be.equal(true)
      expect(stagingAdjustmentsMapper.mapGsAdjustments.called).to.be.equal(true)
      expect(getAppAdjustments.called).to.be.equal(true)
      expect(updateAdjustmentEffectiveTo.calledWith(appAdjustments[0].id, updateTime)).to.be.equal(true)
      expect(insertAdjustment.called).to.be.equal(false)
    })
  })

  it('should correctly process a combination of adding and updating CMS and GS adjustments', function () {
    var appAdjustments = [
      adjustmentRow,
      Object.assign({}, adjustmentRow, { id: 12, points: -1, workloadOwnerId: existingOmId }),
      Object.assign({}, adjustmentRow, { id: 24, points: -6, contactId: 123, workloadOwnerId: existingOmId })
    ]

    stagingAdjustmentsMapper.mapCmsAdjustments.resolves(cmsAdjustments)
    stagingAdjustmentsMapper.mapGsAdjustments.resolves(gsAdjustments)
    getAppAdjustments.resolves(appAdjustments)

    return adjustmentsWorker.execute(task).then(function () {
      expect(createNewTasks.called).to.be.equal(true)
      expect(stagingAdjustmentsMapper.mapCmsAdjustments.called).to.be.equal(true)
      expect(stagingAdjustmentsMapper.mapGsAdjustments.called).to.be.equal(true)
      expect(getAppAdjustments.called).to.be.equal(true)
      expect(updateAdjustmentEffectiveTo.calledWith(appAdjustments[2].id, updateTime)).to.be.equal(true)
      expect(insertAdjustment.calledWith(gsAdjustments[0])).to.be.equal(true)
    })
  })

  it('should throw an error (and  subsequently fail the task) if any internal functions error, e.g. mapping function', function () {
    stagingAdjustmentsMapper.mapCmsAdjustments.rejects(new Error('Test error'))

    return adjustmentsWorker.execute(task)
    .then(function () {
      assert.fail()
    })
    .catch(function (err) {
      expect(err.message).to.eql('Test error')
    })
  })

  it('should throw an error (and  subsequently fail the task) if any internal functions error, e.g. data service', function () {
    getAppAdjustments.rejects(new Error('Test error'))
    stagingAdjustmentsMapper.mapCmsAdjustments.resolves([])
    stagingAdjustmentsMapper.mapGsAdjustments.resolves([])

    return adjustmentsWorker.execute(task)
    .then(function () {
      assert.fail()
    })
    .catch(function (err) {
      expect(err.message).to.eql('Test error')
    })
  })
})

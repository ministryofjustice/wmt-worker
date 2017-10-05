const proxyquire = require('proxyquire')
const sinon = require('sinon')
require('sinon-bluebird')
const expect = require('chai').expect
const adjustmentStatus = require('../../../../app/constants/adjustment-status')
const Task = require('../../../../app/services/domain/task')

var adjustmentsWorker
var updateAdjustmentStatusByIds
var createNewTasks
var mapStagingCmsAdjustments
var getAdjustments
var updateAdjustmentEffectiveTo
var insertAdjustment
var relativeFilePath = 'services/workers/adjustments-worker'

var today = new Date()

var yesterday = new Date(today)
yesterday.setDate(today.getDate() - 1)

var dayBeforeYesterday = new Date(today)
dayBeforeYesterday.setDate(today.getDate() - 2)

var tomorrow = new Date(today)
tomorrow.setDate(today.getDate() + 1)

var dayAfterTomorrow = new Date(today)
dayAfterTomorrow.setDate(today.getDate() + 2)

var activeAdjustment = {
  id: 1,
  effectiveFrom: yesterday,
  effectiveTo: tomorrow,
  status: null
}

var scheduledAdjustment = {
  id: 2,
  effectiveFrom: tomorrow,
  effectiveTo: dayAfterTomorrow,
  status: null
}

var archivedAdjustment = {
  id: 3,
  effectiveFrom: dayBeforeYesterday,
  effectiveTo: yesterday,
  status: null
}

var existingActiveAdjustment = {
  id: 1,
  effectiveFrom: yesterday,
  effectiveTo: tomorrow,
  status: adjustmentStatus.ACTIVE
}

var adjustments = [activeAdjustment, scheduledAdjustment, archivedAdjustment, existingActiveAdjustment]

var existingContactId = 12
var existingContactOmId = 31
var existingOmId = 43
var changedOmId = 55

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

describe(relativeFilePath, function () {
  beforeEach(function () {
    updateAdjustmentStatusByIds = sinon.stub()
    createNewTasks = sinon.stub()
    mapStagingCmsAdjustments = sinon.stub()
    getAdjustments = sinon.stub()
    updateAdjustmentEffectiveTo = sinon.stub()
    insertAdjustment = sinon.stub()
    adjustmentsWorker = proxyquire('../../../../app/' + relativeFilePath, {
      '../log': { info: function (message) { } },
      '../data/update-adjustment-status-by-ids': updateAdjustmentStatusByIds,
      '../data/create-tasks': createNewTasks,
      '../map-staging-cms-adjustments': mapStagingCmsAdjustments,
      '../data/get-app-adjustments-for-batch': getAdjustments,
      '../data/update-adjustment-effective-to': updateAdjustmentEffectiveTo,
      '../data/insert-adjustment': insertAdjustment
    })
  })

  it('should call the database to get the adjustments assigned statuses and call to update database', function () {
    mapStagingCmsAdjustments.resolves([{id: 1}, {id: 2}, {id: 3}])
    getAdjustments.resolves(adjustments)
    updateAdjustmentEffectiveTo.resolves()
    insertAdjustment.resolves()
    updateAdjustmentStatusByIds.resolves(1)
    createNewTasks.resolves()
    return adjustmentsWorker.execute(task).then(function () {
      expect(updateAdjustmentStatusByIds.calledWith([activeAdjustment.id], 'ACTIVE')).to.be.equal(true)
      expect(updateAdjustmentStatusByIds.calledWith([scheduledAdjustment.id], 'SCHEDULED')).to.be.equal(true)
      expect(updateAdjustmentStatusByIds.calledWith([archivedAdjustment.id], 'ARCHIVED')).to.be.equal(true)
      expect(createNewTasks.called).to.be.equal(true)

      expect(mapStagingCmsAdjustments.called).to.be.equal(true)
      expect(getAdjustments.called).to.be.equal(true)
      expect(updateAdjustmentEffectiveTo.called).to.be.equal(false)
      expect(insertAdjustment.called).to.be.equal(false)
    })
  })

  it('should return cms adjustments that exist already in WMT and not update anything', function () {
    var appAdjustments = [{
      id: 1,
      contactId: existingContactId,
      points: 1,
      workloadOwnerId: existingContactOmId,
      effectiveFrom: yesterday,
      effectiveTo: dayAfterTomorrow,
      status: adjustmentStatus.ACTIVE
    },
    {
      id: 12,
      contactId: existingContactId,
      points: -1,
      workloadOwnerId: existingOmId,
      effectiveFrom: yesterday,
      effectiveTo: dayAfterTomorrow,
      status: adjustmentStatus.ACTIVE
    }
    ]

    mapStagingCmsAdjustments.resolves(cmsAdjustments)
    getAdjustments.resolves(appAdjustments)
    updateAdjustmentEffectiveTo.resolves()
    insertAdjustment.resolves()
    updateAdjustmentStatusByIds.resolves(1)
    createNewTasks.resolves()

    return adjustmentsWorker.execute(task).then(function () {
      expect(updateAdjustmentStatusByIds.called).to.be.equal(false)
      expect(createNewTasks.called).to.be.equal(true)

      expect(mapStagingCmsAdjustments.called).to.be.equal(true)
      expect(getAdjustments.called).to.be.equal(true)
      expect(updateAdjustmentEffectiveTo.called).to.be.equal(false)
      expect(insertAdjustment.called).to.be.equal(false)
    })
  })

  it('should return CMS adjustments that do not exist already in WMT and insert new adjustment', function () {
    mapStagingCmsAdjustments.resolves(cmsAdjustments)
    getAdjustments.resolves([])
    updateAdjustmentEffectiveTo.resolves()
    insertAdjustment.resolves()
    updateAdjustmentStatusByIds.resolves(1)
    createNewTasks.resolves()

    return adjustmentsWorker.execute(task).then(function () {
      expect(updateAdjustmentStatusByIds.called).to.be.equal(false)
      expect(createNewTasks.called).to.be.equal(true)

      expect(mapStagingCmsAdjustments.called).to.be.equal(true)
      expect(getAdjustments.called).to.be.equal(true)
      expect(updateAdjustmentEffectiveTo.called).to.be.equal(false)
      expect(insertAdjustment.calledWith(cmsAdjustments[0])).to.be.equal(true)
      expect(insertAdjustment.calledWith(cmsAdjustments[1])).to.be.equal(true)
    })
  })

  it('should return CMS adjustments that exist but are not in the extract and update adjustments', function () {
    var appAdjustments = [{
      id: 1,
      contactId: existingContactId,
      points: 1,
      workloadOwnerId: existingContactOmId,
      effectiveFrom: yesterday,
      effectiveTo: dayAfterTomorrow,
      status: adjustmentStatus.ACTIVE
    },
    {
      id: 12,
      contactId: existingContactId,
      points: -1,
      workloadOwnerId: existingOmId,
      effectiveFrom: yesterday,
      effectiveTo: dayAfterTomorrow,
      status: adjustmentStatus.ACTIVE
    }]

    mapStagingCmsAdjustments.resolves([])
    getAdjustments.resolves(appAdjustments)
    updateAdjustmentEffectiveTo.resolves()
    insertAdjustment.resolves()
    updateAdjustmentStatusByIds.resolves(1)
    createNewTasks.resolves()

    return adjustmentsWorker.execute(task).then(function () {
      expect(updateAdjustmentStatusByIds.called).to.be.equal(false)
      expect(createNewTasks.called).to.be.equal(true)

      expect(mapStagingCmsAdjustments.called).to.be.equal(true)
      expect(getAdjustments.called).to.be.equal(true)
      expect(updateAdjustmentEffectiveTo.calledWith(Number(appAdjustments[0].id), updateTime)).to.be.equal(true)
      expect(updateAdjustmentEffectiveTo.calledWith(appAdjustments[1].id, updateTime)).to.be.equal(true)
      expect(insertAdjustment.called).to.be.equal(false)
    })
  })

  it('should return CMS adjustments that exist but OM key has changed and update old om record and insert new one', function () {
    var appAdjustments = [{
      id: 1,
      contactId: existingContactId,
      workloadOwnerId: existingContactOmId,
      points: 1,
      effectiveFrom: yesterday,
      effectiveTo: dayAfterTomorrow,
      status: adjustmentStatus.ACTIVE
    },
    {
      id: 12,
      contactId: existingContactId,
      workloadOwnerId: changedOmId,
      points: -1,
      effectiveFrom: yesterday,
      effectiveTo: dayAfterTomorrow,
      status: adjustmentStatus.ACTIVE
    }]

    mapStagingCmsAdjustments.resolves(cmsAdjustments)
    getAdjustments.resolves(appAdjustments)
    updateAdjustmentEffectiveTo.resolves()
    insertAdjustment.resolves()
    updateAdjustmentStatusByIds.resolves(1)
    createNewTasks.resolves()

    return adjustmentsWorker.execute(task).then(function () {
      expect(updateAdjustmentStatusByIds.called).to.be.equal(false)
      expect(createNewTasks.called).to.be.equal(true)

      expect(mapStagingCmsAdjustments.called).to.be.equal(true)
      expect(getAdjustments.called).to.be.equal(true)
      expect(updateAdjustmentEffectiveTo.calledWith(appAdjustments[1].id, updateTime)).to.be.equal(true)
      expect(insertAdjustment.calledWith(cmsAdjustments[1])).to.be.equal(true)
    })
  })
})

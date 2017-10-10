const proxyquire = require('proxyquire')
const sinon = require('sinon')
require('sinon-bluebird')
const expect = require('chai').expect
const adjustmentStatus = require('../../../../app/constants/adjustment-status')
const Task = require('../../../../app/services/domain/task')
const dateHelper = require('../../../helpers/data/date-helper')

var adjustmentsWorker
var updateAdjustmentStatusByIds
var createNewTasks
var stagingAdjustmentsMapper
var getAdjustments
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

var adjustmentRow = {
  id: 1,
  contactId: existingContactId,
  points: 1,
  workloadOwnerId: existingContactOmId,
  effectiveFrom: dateHelper.yesterday,
  effectiveTo: dateHelper.dayAfterTomorrow,
  status: adjustmentStatus.ACTIVE
}

// reductionsMapper = {
//   mapCmsReductions: sinon.stub(),
//   mapGsReductions: sinon.stub()
// }

// var existingContactId = 12
// var existingContactOmId = 31
// var existingOmId = 43
// var changedOmId = 55
// var gsContactId = 99

// var cmsReductions = [
//   {
//     contactId: existingContactId,
//     workloadOwnerId: existingContactOmId,
//     hours: 12,
//     reductionReasonId: 1,
//     effectiveFrom: 'testfrom',
//     effetiveTo: 'testto',
//     status: reductionStatus.ACTIVE,
//     note: null,
//     contactType: reductionContactType.CMS
//   },
//   {
//     contactId: existingContactId,
//     workloadOwnerId: existingOmId,
//     hours: -12,
//     reduction_reason_id: 1,
//     effective_from: 'testfrom',
//     effetive_to: 'testto',
//     status: reductionStatus.ACTIVE,
//     note: null,
//     contactType: reductionContactType.CMS
//   }
// ]

// var gsReductions = [
//   {
//     contactId: gsContactId,
//     workloadOwnerId: existingOmId,
//     hours: -6,
//     reduction_reason_id: 2,
//     effective_from: 'testfrom',
//     effetive_to: 'testto',
//     status: reductionStatus.ACTIVE,
//     note: null,
//     contactType: reductionContactType.GS
//   }
// ]

describe(relativeFilePath, function () {
  beforeEach(function () {
    updateAdjustmentStatusByIds = sinon.stub()
    createNewTasks = sinon.stub()
    getAdjustments = sinon.stub()
    updateAdjustmentEffectiveTo = sinon.stub()
    insertAdjustment = sinon.stub()
    stagingAdjustmentsMapper = {
      mapCmsAdjustments: sinon.stub(),
      mapGsAdjustments: sinon.stub()
    }

    adjustmentsWorker = proxyquire('../../../../app/' + relativeFilePath, {
      '../log': { info: function (message) { } },
      '../data/update-adjustment-status-by-ids': updateAdjustmentStatusByIds,
      '../data/create-tasks': createNewTasks,
      '../staging-adjustments-mapper': stagingAdjustmentsMapper,
      '../data/get-app-adjustments-for-batch': getAdjustments,
      '../data/update-adjustment-effective-to': updateAdjustmentEffectiveTo,
      '../data/insert-adjustment': insertAdjustment
    })
  })

  it('should call the database to get the adjustments assigned statuses and call to update database', function () {
    stagingAdjustmentsMapper.mapCmsAdjustments.resolves([{id: 1}, {id: 2}, {id: 3}])
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

      expect(stagingAdjustmentsMapper.mapCmsAdjustments.called).to.be.equal(true)
      expect(getAdjustments.called).to.be.equal(true)
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
    getAdjustments.resolves(appAdjustments)
    updateAdjustmentEffectiveTo.resolves()
    insertAdjustment.resolves()
    updateAdjustmentStatusByIds.resolves(1)
    createNewTasks.resolves()

    return adjustmentsWorker.execute(task).then(function () {
      expect(updateAdjustmentStatusByIds.called).to.be.equal(false)
      expect(createNewTasks.called).to.be.equal(true)

      expect(stagingAdjustmentsMapper.mapCmsAdjustments.called).to.be.equal(true)
      expect(getAdjustments.called).to.be.equal(true)
      expect(updateAdjustmentEffectiveTo.called).to.be.equal(false)
      expect(insertAdjustment.called).to.be.equal(false)
    })
  })

  it('should return CMS adjustments that do not exist already in WMT and insert new adjustment', function () {
    stagingAdjustmentsMapper.mapCmsAdjustments.resolves(cmsAdjustments)
    getAdjustments.resolves([])
    updateAdjustmentEffectiveTo.resolves()
    insertAdjustment.resolves()
    updateAdjustmentStatusByIds.resolves(1)
    createNewTasks.resolves()

    return adjustmentsWorker.execute(task).then(function () {
      expect(updateAdjustmentStatusByIds.called).to.be.equal(false)
      expect(createNewTasks.called).to.be.equal(true)

      expect(stagingAdjustmentsMapper.mapCmsAdjustments.called).to.be.equal(true)
      expect(getAdjustments.called).to.be.equal(true)
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
    getAdjustments.resolves(appAdjustments)
    updateAdjustmentEffectiveTo.resolves()
    insertAdjustment.resolves()
    updateAdjustmentStatusByIds.resolves(1)
    createNewTasks.resolves()

    return adjustmentsWorker.execute(task).then(function () {
      expect(updateAdjustmentStatusByIds.called).to.be.equal(false)
      expect(createNewTasks.called).to.be.equal(true)

      expect(stagingAdjustmentsMapper.mapCmsAdjustments.called).to.be.equal(true)
      expect(getAdjustments.called).to.be.equal(true)
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
    getAdjustments.resolves(appAdjustments)
    updateAdjustmentEffectiveTo.resolves()
    insertAdjustment.resolves()
    updateAdjustmentStatusByIds.resolves(1)
    createNewTasks.resolves()

    return adjustmentsWorker.execute(task).then(function () {
      expect(updateAdjustmentStatusByIds.called).to.be.equal(false)
      expect(createNewTasks.called).to.be.equal(true)

      expect(stagingAdjustmentsMapper.mapCmsAdjustments.called).to.be.equal(true)
      expect(getAdjustments.called).to.be.equal(true)
      expect(updateAdjustmentEffectiveTo.calledWith(appAdjustments[1].id, updateTime)).to.be.equal(true)
      expect(insertAdjustment.calledWith(cmsAdjustments[1])).to.be.equal(true)
    })
  })
})

// it('should retrieve staging GS reductions and insert them as a new reduction in app when they do not exist', function () {
//   reductionsMapper.mapCmsReductions.resolves([])
//   reductionsMapper.mapGsReductions.resolves(gsReductions)
//   getAppCmsAndGsReductions.resolves([])
//   updateReductionEffectiveTo.resolves()
//   insertReduction.resolves()
//   getAllOpenReductions.resolves([])
//   updateReductionStatusByIds.resolves(1)
//   createNewTasks.resolves()

//   return reductionsWorker.execute({}).then(function () {
//     expect(getAllOpenReductions.called).to.be.equal(true)
//     expect(updateReductionStatusByIds.called).to.be.equal(false)
//     expect(createNewTasks.called).to.be.equal(true)

//     expect(reductionsMapper.mapCmsReductions.called).to.be.equal(true)
//     expect(getAppCmsAndGsReductions.called).to.be.equal(true)
//     expect(updateReductionEffectiveTo.called).to.be.equal(false)
//     expect(insertReduction.calledWith(gsReductions[0])).to.be.equal(true)
//   })
// })

// it('should retrieve staging GS reductions and update them in app when they exist but are not in the extract', function () {
//   var appReductions = [
//     {
//       id: 24,
//       contactId: gsContactId,
//       hours: -6,
//       workloadOwnerId: existingOmId
//     }
//   ]

//   reductionsMapper.mapCmsReductions.resolves([])
//   reductionsMapper.mapGsReductions.resolves([])
//   getAppCmsAndGsReductions.resolves(appReductions)
//   updateReductionEffectiveTo.resolves()
//   insertReduction.resolves()
//   getAllOpenReductions.resolves([])
//   updateReductionStatusByIds.resolves(1)
//   createNewTasks.resolves()

//   return reductionsWorker.execute({}).then(function () {
//     expect(getAllOpenReductions.called).to.be.equal(true)
//     expect(updateReductionStatusByIds.called).to.be.equal(false)
//     expect(createNewTasks.called).to.be.equal(true)

//     expect(reductionsMapper.mapCmsReductions.called).to.be.equal(true)
//     expect(getAppCmsAndGsReductions.called).to.be.equal(true)
//     expect(updateReductionEffectiveTo.calledWith(appReductions[0].id, updateTime)).to.be.equal(true)
//     expect(insertReduction.called).to.be.equal(false)
//   })
// })

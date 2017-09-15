const proxyquire = require('proxyquire')
const sinon = require('sinon')
require('sinon-bluebird')
const expect = require('chai').expect

var reductionsWorker
var getAllOpenReductions
var updateReductionStatusByIds
var createNewTasks
var mapStagingCmsReductions
var getAppCmsReductions
var updateReductionEffectiveTo
var insertReduction
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

var existingActiveReduction = {
  id: 1,
  effectiveFrom: yesterday,
  effectiveTo: tomorrow,
  status: 'ACTIVE'
}

var reductions = [activeReduction, scheduledReduction, archivedReduction, existingActiveReduction]

var existingContactId = 12
var existingContactOmId = 31
var existingOmId = 43
var changedOmId = 55

var cmsReductions = [
  {
    contactId: existingContactId,
    workloadOwnerId: existingContactOmId,
    hours: 12,
    reductionReasonId: 1,
    effectiveFrom: 'testfrom',
    effetiveTo: 'testto',
    status: 'ACTIVE',
    note: null
  },
  {
    contactId: existingContactId,
    workloadOwnerId: existingOmId,
    hours: -12,
    reduction_reason_id: 1,
    effective_from: 'testfrom',
    effetive_to: 'testto',
    status: 'ACTIVE',
    note: null
  }
]

describe(relativeFilePath, function () {
  beforeEach(function () {
    getAllOpenReductions = sinon.stub()
    updateReductionStatusByIds = sinon.stub()
    createNewTasks = sinon.stub()
    mapStagingCmsReductions = sinon.stub()
    getAppCmsReductions = sinon.stub()
    updateReductionEffectiveTo = sinon.stub()
    insertReduction = sinon.stub()
    reductionsWorker = proxyquire('../../../../app/' + relativeFilePath, {
      '../log': { info: function (message) { } },
      '../data/get-all-open-reductions': getAllOpenReductions,
      '../data/update-reduction-status-by-ids': updateReductionStatusByIds,
      '../data/create-tasks': createNewTasks,
      '../map-staging-cms-reductions': mapStagingCmsReductions,
      '../data/get-app-cms-reductions': getAppCmsReductions,
      '../data/update-reduction-effective-to': updateReductionEffectiveTo,
      '../data/insert-reduction': insertReduction
    })
  })

  it('should call the database to get the reductions assign statuses and call to update database', function () {
    mapStagingCmsReductions.resolves([])
    getAppCmsReductions.resolves([])
    updateReductionEffectiveTo.resolves()
    insertReduction.resolves()
    getAllOpenReductions.resolves(reductions)
    updateReductionStatusByIds.resolves(1)
    createNewTasks.resolves()
    return reductionsWorker.execute({}).then(function () {
      expect(getAllOpenReductions.called).to.be.equal(true)
      expect(updateReductionStatusByIds.calledWith([activeReduction.id], 'ACTIVE')).to.be.equal(true)
      expect(updateReductionStatusByIds.calledWith([scheduledReduction.id], 'SCHEDULED')).to.be.equal(true)
      expect(updateReductionStatusByIds.calledWith([archivedReduction.id], 'ARCHIVED')).to.be.equal(true)
      expect(createNewTasks.called).to.be.equal(true)

      expect(mapStagingCmsReductions.called).to.be.equal(true)
      expect(getAppCmsReductions.called).to.be.equal(true)
      expect(updateReductionEffectiveTo.called).to.be.equal(false)
      expect(insertReduction.called).to.be.equal(false)
    })
  })

  it('should return cms reductions that exist already in wmt and not update anything', function () {
    var appReductions = [{
      id: 1,
      contactId: existingContactId,
      hours: 1,
      workloadOwnerId: existingContactOmId
    },
    {
      id: 12,
      contactId: existingContactId,
      hours: -1,
      workloadOwnerId: existingOmId
    }
    ]

    mapStagingCmsReductions.resolves(cmsReductions)
    getAppCmsReductions.resolves(appReductions)
    updateReductionEffectiveTo.resolves()
    insertReduction.resolves()
    getAllOpenReductions.resolves([])
    updateReductionStatusByIds.resolves(1)
    createNewTasks.resolves()

    return reductionsWorker.execute({}).then(function () {
      expect(getAllOpenReductions.called).to.be.equal(true)
      expect(updateReductionStatusByIds.called).to.be.equal(false)
      expect(createNewTasks.called).to.be.equal(true)

      expect(mapStagingCmsReductions.called).to.be.equal(true)
      expect(getAppCmsReductions.called).to.be.equal(true)
      expect(updateReductionEffectiveTo.called).to.be.equal(false)
      expect(insertReduction.called).to.be.equal(false)
    })
  })

  it('should return cms reductions that do not exist already in wmt and insert new reduction', function () {
    mapStagingCmsReductions.resolves(cmsReductions)
    getAppCmsReductions.resolves([])
    updateReductionEffectiveTo.resolves()
    insertReduction.resolves()
    getAllOpenReductions.resolves([])
    updateReductionStatusByIds.resolves(1)
    createNewTasks.resolves()

    return reductionsWorker.execute({}).then(function () {
      expect(getAllOpenReductions.called).to.be.equal(true)
      expect(updateReductionStatusByIds.called).to.be.equal(false)
      expect(createNewTasks.called).to.be.equal(true)

      expect(mapStagingCmsReductions.called).to.be.equal(true)
      expect(getAppCmsReductions.called).to.be.equal(true)
      expect(updateReductionEffectiveTo.called).to.be.equal(false)
      expect(insertReduction.calledWith(cmsReductions[0])).to.be.equal(true)
      expect(insertReduction.calledWith(cmsReductions[1])).to.be.equal(true)
    })
  })

  it('should return cms reductions that exist but are not in the extract and update reductions', function () {
    var appReductions = [{
      id: 1,
      contactId: existingContactId,
      hours: 1,
      workloadOwnerId: existingContactOmId
    },
    {
      id: 12,
      contactId: existingContactId,
      hours: -1,
      workloadOwnerId: existingOmId
    }]

    mapStagingCmsReductions.resolves([])
    getAppCmsReductions.resolves(appReductions)
    updateReductionEffectiveTo.resolves()
    insertReduction.resolves()
    getAllOpenReductions.resolves([])
    updateReductionStatusByIds.resolves(1)
    createNewTasks.resolves()

    return reductionsWorker.execute({}).then(function () {
      expect(getAllOpenReductions.called).to.be.equal(true)
      expect(updateReductionStatusByIds.called).to.be.equal(false)
      expect(createNewTasks.called).to.be.equal(true)

      expect(mapStagingCmsReductions.called).to.be.equal(true)
      expect(getAppCmsReductions.called).to.be.equal(true)
      expect(updateReductionEffectiveTo.calledWith(appReductions[0].id, new Date().setHours(0, 0, 0, 0))).to.be.equal(true)
      expect(updateReductionEffectiveTo.calledWith(appReductions[1].id, new Date().setHours(0, 0, 0, 0))).to.be.equal(true)
      expect(insertReduction.called).to.be.equal(false)
    })
  })

  it('should return cms reductions that exist but OM key has changed and update old om record and insert new one', function () {
    var appReductions = [{
      id: 1,
      contactId: existingContactId,
      workloadOwnerId: existingContactOmId,
      hours: 1
    },
    {
      id: 12,
      contactId: existingContactId,
      workloadOwnerId: changedOmId,
      hours: -1
    }]

    mapStagingCmsReductions.resolves(cmsReductions)
    getAppCmsReductions.resolves(appReductions)
    updateReductionEffectiveTo.resolves()
    insertReduction.resolves()
    getAllOpenReductions.resolves([])
    updateReductionStatusByIds.resolves(1)
    createNewTasks.resolves()

    return reductionsWorker.execute({}).then(function () {
      expect(getAllOpenReductions.called).to.be.equal(true)
      expect(updateReductionStatusByIds.called).to.be.equal(false)
      expect(createNewTasks.called).to.be.equal(true)

      expect(mapStagingCmsReductions.called).to.be.equal(true)
      expect(getAppCmsReductions.called).to.be.equal(true)
      expect(updateReductionEffectiveTo.calledWith(appReductions[1].id, new Date().setHours(0, 0, 0, 0))).to.be.equal(true)
      expect(insertReduction.calledWith(cmsReductions[1])).to.be.equal(true)
    })
  })
})

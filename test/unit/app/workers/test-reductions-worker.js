const proxyquire = require('proxyquire')
const sinon = require('sinon')
require('sinon-bluebird')
const expect = require('chai').expect

const reductionStatus = require('../../../../app/constants/reduction-status')
const reductionContactType = require('../../../../app/constants/reduction-contact-type')

var reductionsWorker
var getAllOpenReductions
var updateReductionStatusByIds
var createNewTasks
var reductionsMapper
var getAppCmsAndGsReductions
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
  status: reductionStatus.ACTIVE
}

var reductions = [activeReduction, scheduledReduction, archivedReduction, existingActiveReduction]

var existingContactId = 12
var existingContactOmId = 31
var existingOmId = 43
var changedOmId = 55
var gsContactId = 99

var cmsReductions = [
  {
    contactId: existingContactId,
    workloadOwnerId: existingContactOmId,
    hours: 12,
    reductionReasonId: 1,
    effectiveFrom: 'testfrom',
    effetiveTo: 'testto',
    status: reductionStatus.ACTIVE,
    note: null,
    contactType: reductionContactType.CMS
  },
  {
    contactId: existingContactId,
    workloadOwnerId: existingOmId,
    hours: -12,
    reduction_reason_id: 1,
    effective_from: 'testfrom',
    effetive_to: 'testto',
    status: reductionStatus.ACTIVE,
    note: null,
    contactType: reductionContactType.CMS
  }
]

var gsReductions = [
  {
    contactId: gsContactId,
    workloadOwnerId: existingOmId,
    hours: -6,
    reduction_reason_id: 2,
    effective_from: 'testfrom',
    effetive_to: 'testto',
    status: reductionStatus.ACTIVE,
    note: null,
    contactType: reductionContactType.GS
  }
]

var updateTime = new Date()
updateTime.setHours(0, 0, 0, 0)

describe(relativeFilePath, function () {
  beforeEach(function () {
    getAllOpenReductions = sinon.stub()
    updateReductionStatusByIds = sinon.stub()
    createNewTasks = sinon.stub()
    reductionsMapper = {
      mapCmsReductions: sinon.stub(),
      mapGsReductions: sinon.stub()
    }
    getAppCmsAndGsReductions = sinon.stub()
    updateReductionEffectiveTo = sinon.stub()
    insertReduction = sinon.stub()
    reductionsWorker = proxyquire('../../../../app/' + relativeFilePath, {
      '../log': { info: function (message) { } },
      '../data/get-all-open-reductions': getAllOpenReductions,
      '../data/update-reduction-status-by-ids': updateReductionStatusByIds,
      '../data/create-tasks': createNewTasks,
      '../staging-reductions-mapper': reductionsMapper,
      '../data/get-app-cms-and-gs-reductions': getAppCmsAndGsReductions,
      '../data/update-reduction-effective-to': updateReductionEffectiveTo,
      '../data/insert-reduction': insertReduction
    })
  })

  it('should call the database to get all open reductions, assign statuses and call to update database', function () {
    reductionsMapper.mapCmsReductions.resolves([])
    reductionsMapper.mapGsReductions.resolves([])
    getAppCmsAndGsReductions.resolves([])
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

      expect(reductionsMapper.mapCmsReductions.called).to.be.equal(true)
      expect(getAppCmsAndGsReductions.called).to.be.equal(true)
      expect(updateReductionEffectiveTo.called).to.be.equal(false)
      expect(insertReduction.called).to.be.equal(false)
    })
  })

  it('should retrieve CMS and GS reductions from staging and not update anything when they already exist in app', function () {
    var appReductions = [
      {
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
      },
      {
        id: 24,
        contactId: gsContactId,
        hours: -6,
        workloadOwnerId: existingOmId
      }
    ]

    reductionsMapper.mapCmsReductions.resolves(cmsReductions)
    reductionsMapper.mapGsReductions.resolves(gsReductions)
    getAppCmsAndGsReductions.resolves(appReductions)
    updateReductionEffectiveTo.resolves()
    insertReduction.resolves()
    getAllOpenReductions.resolves([])
    updateReductionStatusByIds.resolves(1)
    createNewTasks.resolves()

    return reductionsWorker.execute({}).then(function () {
      expect(getAllOpenReductions.called).to.be.equal(true)
      expect(updateReductionStatusByIds.called).to.be.equal(false)
      expect(createNewTasks.called).to.be.equal(true)

      expect(reductionsMapper.mapCmsReductions.called).to.be.equal(true)
      expect(getAppCmsAndGsReductions.called).to.be.equal(true)
      expect(updateReductionEffectiveTo.called).to.be.equal(false)
      expect(insertReduction.called).to.be.equal(false)
    })
  })

  it('should retrieve staging CMS reductions and insert them as a new reduction in app when they do not exist', function () {
    reductionsMapper.mapCmsReductions.resolves(cmsReductions)
    reductionsMapper.mapGsReductions.resolves([])
    getAppCmsAndGsReductions.resolves([])
    updateReductionEffectiveTo.resolves()
    insertReduction.resolves()
    getAllOpenReductions.resolves([])
    updateReductionStatusByIds.resolves(1)
    createNewTasks.resolves()

    return reductionsWorker.execute({}).then(function () {
      expect(getAllOpenReductions.called).to.be.equal(true)
      expect(updateReductionStatusByIds.called).to.be.equal(false)
      expect(createNewTasks.called).to.be.equal(true)

      expect(reductionsMapper.mapCmsReductions.called).to.be.equal(true)
      expect(getAppCmsAndGsReductions.called).to.be.equal(true)
      expect(updateReductionEffectiveTo.called).to.be.equal(false)
      expect(insertReduction.calledWith(cmsReductions[0])).to.be.equal(true)
      expect(insertReduction.calledWith(cmsReductions[1])).to.be.equal(true)
    })
  })

  it('should retrieve staging CMS reductions and update them in app when they exist but are not in the extract', function () {
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

    reductionsMapper.mapCmsReductions.resolves([])
    reductionsMapper.mapGsReductions.resolves([])
    getAppCmsAndGsReductions.resolves(appReductions)
    updateReductionEffectiveTo.resolves()
    insertReduction.resolves()
    getAllOpenReductions.resolves([])
    updateReductionStatusByIds.resolves(1)
    createNewTasks.resolves()

    return reductionsWorker.execute({}).then(function () {
      expect(getAllOpenReductions.called).to.be.equal(true)
      expect(updateReductionStatusByIds.called).to.be.equal(false)
      expect(createNewTasks.called).to.be.equal(true)

      expect(reductionsMapper.mapCmsReductions.called).to.be.equal(true)
      expect(getAppCmsAndGsReductions.called).to.be.equal(true)
      expect(updateReductionEffectiveTo.calledWith(Number(appReductions[0].id), updateTime)).to.be.equal(true)
      expect(updateReductionEffectiveTo.calledWith(appReductions[1].id, updateTime)).to.be.equal(true)
      expect(insertReduction.called).to.be.equal(false)
    })
  })

  it('should retrieve staging CMS reductions and update old OM record and insert new one in app when the reduction exists but OM key has changed', function () {
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

    reductionsMapper.mapCmsReductions.resolves(cmsReductions)
    reductionsMapper.mapGsReductions.resolves([])
    getAppCmsAndGsReductions.resolves(appReductions)
    updateReductionEffectiveTo.resolves()
    insertReduction.resolves()
    getAllOpenReductions.resolves([])
    updateReductionStatusByIds.resolves(1)
    createNewTasks.resolves()

    return reductionsWorker.execute({}).then(function () {
      expect(getAllOpenReductions.called).to.be.equal(true)
      expect(updateReductionStatusByIds.called).to.be.equal(false)
      expect(createNewTasks.called).to.be.equal(true)

      expect(reductionsMapper.mapCmsReductions.called).to.be.equal(true)
      expect(getAppCmsAndGsReductions.called).to.be.equal(true)
      expect(updateReductionEffectiveTo.calledWith(appReductions[1].id, updateTime)).to.be.equal(true)
      expect(insertReduction.calledWith(cmsReductions[1])).to.be.equal(true)
    })
  })

  it('should retrieve staging GS reductions and insert them as a new reduction in app when they do not exist', function () {
    reductionsMapper.mapCmsReductions.resolves([])
    reductionsMapper.mapGsReductions.resolves(gsReductions)
    getAppCmsAndGsReductions.resolves([])
    updateReductionEffectiveTo.resolves()
    insertReduction.resolves()
    getAllOpenReductions.resolves([])
    updateReductionStatusByIds.resolves(1)
    createNewTasks.resolves()

    return reductionsWorker.execute({}).then(function () {
      expect(getAllOpenReductions.called).to.be.equal(true)
      expect(updateReductionStatusByIds.called).to.be.equal(false)
      expect(createNewTasks.called).to.be.equal(true)

      expect(reductionsMapper.mapCmsReductions.called).to.be.equal(true)
      expect(getAppCmsAndGsReductions.called).to.be.equal(true)
      expect(updateReductionEffectiveTo.called).to.be.equal(false)
      expect(insertReduction.calledWith(gsReductions[0])).to.be.equal(true)
    })
  })

  it('should retrieve staging GS reductions and update them in app when they exist but are not in the extract', function () {
    var appReductions = [
      {
        id: 24,
        contactId: gsContactId,
        hours: -6,
        workloadOwnerId: existingOmId
      }
    ]

    reductionsMapper.mapCmsReductions.resolves([])
    reductionsMapper.mapGsReductions.resolves([])
    getAppCmsAndGsReductions.resolves(appReductions)
    updateReductionEffectiveTo.resolves()
    insertReduction.resolves()
    getAllOpenReductions.resolves([])
    updateReductionStatusByIds.resolves(1)
    createNewTasks.resolves()

    return reductionsWorker.execute({}).then(function () {
      expect(getAllOpenReductions.called).to.be.equal(true)
      expect(updateReductionStatusByIds.called).to.be.equal(false)
      expect(createNewTasks.called).to.be.equal(true)

      expect(reductionsMapper.mapCmsReductions.called).to.be.equal(true)
      expect(getAppCmsAndGsReductions.called).to.be.equal(true)
      expect(updateReductionEffectiveTo.calledWith(appReductions[0].id, updateTime)).to.be.equal(true)
      expect(insertReduction.called).to.be.equal(false)
    })
  })
})

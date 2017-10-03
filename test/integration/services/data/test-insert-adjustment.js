const expect = require('chai').expect
const moment = require('moment')

const workloadHelper = require('../../../helpers/data/app-workload-helper')
const adjustmentsHelper = require('../../../helpers/data/app-adjustments-helper')
const insertAdjustment = require('../../../../app/services/data/insert-adjustment')
const adjustmentStatus = require('../../../../app/constants/adjustment-status')
const adjustmentCategory = require('../../../../app/constants/adjustment-category')

var inserts = []
var workloadOwnerId
var workloads
var minWorkloadId
var maxWorkloadId

var effectiveFrom = new Date()
var effectiveTo = new Date()

const cmsAdjustmentToInsert = {
  adjustmentReasonId: 1,
  workloadOwnerId: 2,
  points: 10,
  effectiveFrom: effectiveFrom,
  effectiveTo: effectiveTo,
  status: adjustmentStatus.ACTIVE,
  contactId: 4
}

const gsAdjustmentToInsert = {
  adjustmentReasonId: 40,
  workloadOwnerId: 2,
  points: 10,
  effectiveFrom: effectiveFrom,
  effectiveTo: effectiveTo,
  status: adjustmentStatus.ACTIVE,
  contactId: 12
}

describe('app/services/data/insert-adjustment', function () {
  before(function (done) {
    workloadHelper.insertDependencies(inserts)
      .then(function (builtInserts) {
        inserts = builtInserts
        workloadOwnerId = inserts.filter((item) => item.table === 'workload_owner')[0].id
        workloads = inserts.filter((item) => item.table === 'workload')
        minWorkloadId = workloads[0].id
        maxWorkloadId = workloads[workloads.length - 1].id
        done()
      })
  })

  it('should insert a CMS adjustment and return an id', function () {
    cmsAdjustmentToInsert.workloadOwnerId = workloadOwnerId
    return insertAdjustment(cmsAdjustmentToInsert)
    .then(function (resultId) {
      inserts.push({table: 'adjustments', id: resultId})
      expect(resultId).to.be.a('number')
      return adjustmentsHelper.getAdjustmentsForTest(adjustmentCategory.CMS, minWorkloadId, maxWorkloadId)
      .then(function (adjustments) {
        var expected = {
          id: resultId,
          workloadOwnerId: cmsAdjustmentToInsert.workloadOwnerId,
          contactId: cmsAdjustmentToInsert.contactId,
          points: cmsAdjustmentToInsert.points,
          adjustmentReasonId: cmsAdjustmentToInsert.adjustmentReasonId,
          effectiveFrom: moment(effectiveFrom).format('YYYY-MM-DDTHH:mm:ss'),
          effectiveTo: moment(effectiveTo).format('YYYY-MM-DDTHH:mm:ss'),
          status: cmsAdjustmentToInsert.status
        }
        expect(adjustments).to.contain(expected)
      })
    })
  })

  it('should insert a GS adjustment and return an id', function () {
    gsAdjustmentToInsert.workloadOwnerId = workloadOwnerId
    return insertAdjustment(gsAdjustmentToInsert)
    .then(function (resultId) {
      inserts.push({table: 'adjustments', id: resultId})
      expect(resultId).to.be.a('number')
      return adjustmentsHelper.getAdjustmentsForTest(adjustmentCategory.GS, minWorkloadId, maxWorkloadId)
      .then(function (adjustments) {
        var expected = {
          id: resultId,
          workloadOwnerId: gsAdjustmentToInsert.workloadOwnerId,
          contactId: gsAdjustmentToInsert.contactId,
          points: gsAdjustmentToInsert.points,
          adjustmentReasonId: gsAdjustmentToInsert.adjustmentReasonId,
          effectiveFrom: moment(effectiveFrom).format('YYYY-MM-DDTHH:mm:ss'),
          effectiveTo: moment(effectiveTo).format('YYYY-MM-DDTHH:mm:ss'),
          status: gsAdjustmentToInsert.status
        }
        expect(adjustments).to.contain(expected)
      })
    })
  })

  after(function () {
    return workloadHelper.removeDependencies(inserts)
  })
})

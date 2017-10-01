const expect = require('chai').expect

const helper = require('../../../helpers/data/app-workload-helper')
const insertAdjustment = require('../../../../app/services/data/insert-adjustment')
const getAdjustments = require('../../../../app/services/data/get-adjustments')
const adjustmentStatus = require('../../../../app/constants/adjustment-status')
const adjustmentCategory = require('../../../../app/constants/adjustment-category')

var inserts = []

const cmsAdjustmentToInsert = {
  adjustmentReasonId: 1,
  workloadOwnerId: 2,
  points: 10,
  effectiveFrom: new Date(),
  effectiveTo: new Date(),
  status: adjustmentStatus.ACTIVE,
  contactId: 4
}

const gsAdjustmentToInsert = {
  adjustmentReasonId: 40,
  workloadOwnerId: 2,
  points: 10,
  effectiveFrom: new Date(),
  effectiveTo: new Date(),
  status: adjustmentStatus.ACTIVE,
  contactId: 12
}

describe('app/services/data/insert-adjustment', function () {
  before(function (done) {
    helper.insertDependencies(inserts)
      .then(function (builtInserts) {
        inserts = builtInserts
        done()
      })
  })

  it('should insert a CMS adjustment and return an id', function () {
    var workloadOwnerId = inserts.filter((item) => item.table === 'workload_owner')[0].id
    cmsAdjustmentToInsert.workloadOwnerId = workloadOwnerId
    return insertAdjustment(cmsAdjustmentToInsert)
    .then(function (resultId) {
      inserts.push({table: 'adjustments', id: resultId})
      expect(resultId).to.be.a('number')
      return getAdjustments(adjustmentCategory.CMS)
      .then(function (reductions) {
        var expected = {
          id: resultId,
          workloadOwnerId: cmsAdjustmentToInsert.workloadOwnerId,
          contactId: cmsAdjustmentToInsert.contactId,
          points: cmsAdjustmentToInsert.points
        }
        expect(reductions).to.contain(expected)
      })
    })
  })

  it('should insert a GS adjustment and return an id', function () {
    var workloadOwnerId = inserts.filter((item) => item.table === 'workload_owner')[0].id
    gsAdjustmentToInsert.workloadOwnerId = workloadOwnerId
    return insertAdjustment(gsAdjustmentToInsert)
    .then(function (resultId) {
      inserts.push({table: 'adjustments', id: resultId})
      expect(resultId).to.be.a('number')
      return getAdjustments(adjustmentCategory.GS)
      .then(function (reductions) {
        var expected = {
          id: resultId,
          workloadOwnerId: gsAdjustmentToInsert.workloadOwnerId,
          contactId: gsAdjustmentToInsert.contactId,
          points: gsAdjustmentToInsert.points
        }
        expect(reductions).to.contain(expected)
      })
    })
  })

  after(function () {
    return helper.removeDependencies(inserts)
  })
})

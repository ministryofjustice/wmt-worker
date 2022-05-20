const expect = require('chai').expect
const moment = require('moment')

const workloadHelper = require('../../../helpers/data/app-workload-helper')
const adjustmentsHelper = require('../../../helpers/data/app-adjustments-helper')
const insertAdjustment = require('../../../../app/services/data/insert-adjustment')
const adjustmentStatus = require('../../../../app/constants/adjustment-status')
const adjustmentCategory = require('../../../../app/constants/adjustment-category')

let inserts = []
let workloadOwnerId
let minWorkloadStagingId
let maxWorkloadStagingId
let workloadReportId

const effectiveFrom = new Date()
const effectiveTo = new Date()

const cmsAdjustmentToInsert = {
  adjustmentReasonId: 1,
  workloadOwnerId: 2,
  points: 10,
  effectiveFrom,
  effectiveTo,
  status: adjustmentStatus.ACTIVE,
  contactId: 4,
  crn: 'CMSTEST1000'
}

const gsAdjustmentToInsert = {
  adjustmentReasonId: 40,
  workloadOwnerId: 2,
  points: 10,
  effectiveFrom,
  effectiveTo,
  status: adjustmentStatus.ACTIVE,
  contactId: 12,
  crn: 'GSTEST1000'
}

describe('app/services/data/insert-adjustment', function () {
  before(function (done) {
    workloadHelper.insertDependencies(inserts)
      .then(function (builtInserts) {
        inserts = builtInserts
        workloadOwnerId = inserts.filter((item) => item.table === 'workload_owner')[0].id
        workloadReportId = inserts.filter((item) => item.table === 'workload_report')[0].id
        minWorkloadStagingId = 1
        maxWorkloadStagingId = minWorkloadStagingId + 1
        done()
      })
  })

  it('should insert a CMS adjustment and return an id', function () {
    cmsAdjustmentToInsert.workloadOwnerId = workloadOwnerId
    return insertAdjustment(cmsAdjustmentToInsert)
      .then(function (resultId) {
        inserts.push({ table: 'adjustments', id: resultId })
        expect(resultId).to.be.a('number')
        return adjustmentsHelper.getAdjustmentsForTest(adjustmentCategory.CMS, minWorkloadStagingId, maxWorkloadStagingId, workloadReportId)
          .then(function (adjustments) {
            const expected = {
              id: resultId,
              workloadOwnerId: cmsAdjustmentToInsert.workloadOwnerId,
              contactId: cmsAdjustmentToInsert.contactId,
              points: cmsAdjustmentToInsert.points,
              adjustmentReasonId: cmsAdjustmentToInsert.adjustmentReasonId,
              effectiveFrom: moment(effectiveFrom).format('YYYY-MM-DDTHH:mm:ss'),
              effectiveTo: moment(effectiveTo).format('YYYY-MM-DDTHH:mm:ss'),
              status: cmsAdjustmentToInsert.status,
              case_ref_no: cmsAdjustmentToInsert.crn
            }
            expect(adjustments[0].id).to.equal(expected.id)
            expect(adjustments[0].workloadOwnerId).to.equal(expected.workloadOwnerId)
            expect(adjustments[0].contactId).to.equal(expected.contactId)
            expect(adjustments[0].points).to.equal(expected.points)
            expect(adjustments[0].adjustmentReasonId).to.equal(expected.adjustmentReasonId)
            expect(adjustments[0].effectiveFrom).to.equal(expected.effectiveFrom)
            expect(adjustments[0].effectiveTo).to.equal(expected.effectiveTo)
            expect(adjustments[0].status).to.equal(expected.status)
            expect(adjustments[0].case_ref_no).to.equal(expected.case_ref_no)
          })
      })
  })

  it('should insert a GS adjustment and return an id', function () {
    gsAdjustmentToInsert.workloadOwnerId = workloadOwnerId
    return insertAdjustment(gsAdjustmentToInsert)
      .then(function (resultId) {
        inserts.push({ table: 'adjustments', id: resultId })
        expect(resultId).to.be.a('number')
        return adjustmentsHelper.getAdjustmentsForTest(adjustmentCategory.GS, minWorkloadStagingId, maxWorkloadStagingId, workloadReportId)
          .then(function (adjustments) {
            const expected = {
              id: resultId,
              workloadOwnerId: gsAdjustmentToInsert.workloadOwnerId,
              contactId: gsAdjustmentToInsert.contactId,
              points: gsAdjustmentToInsert.points,
              adjustmentReasonId: gsAdjustmentToInsert.adjustmentReasonId,
              effectiveFrom: moment(effectiveFrom).format('YYYY-MM-DDTHH:mm:ss'),
              effectiveTo: moment(effectiveTo).format('YYYY-MM-DDTHH:mm:ss'),
              status: gsAdjustmentToInsert.status,
              case_ref_no: gsAdjustmentToInsert.crn
            }
            expect(adjustments).to.deep.contain(expected)
          })
      })
  })

  after(function () {
    return workloadHelper.removeDependencies(inserts)
  })
})

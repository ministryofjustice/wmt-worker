const expect = require('chai').expect

const workloadHelper = require('../../../helpers/data/app-workload-helper')
const adjustmentsHelper = require('../../../helpers/data/app-adjustments-helper')
const insertAdjustment = require('../../../../app/services/data/insert-adjustment')
const adjustmentStatus = require('../../../../app/constants/adjustment-status')
const removeIntegrationTestData = require('../../../helpers/data/remove-integration-test-data')

let inserts = []

const cmsAdjustmentToInsert = {
  adjustmentReasonId: 1,
  workloadOwnerId: 2,
  points: 10,
  effectiveFrom: new Date(),
  effectiveTo: new Date(),
  status: adjustmentStatus.ACTIVE,
  contactId: 4,
  crn: 'CMSTEST1000'
}

describe('app/services/data/insert-adjustment', function () {
  before(function () {
    return workloadHelper.insertDependencies(inserts)
      .then(function (builtInserts) {
        inserts = builtInserts
        cmsAdjustmentToInsert.workloadOwnerId = inserts.filter((item) => item.table === 'workload_owner')[0].id
      })
  })

  it('should insert a CMS adjustment and return an id', function () {
    return insertAdjustment(cmsAdjustmentToInsert)
      .then(function (resultId) {
        inserts.push({ table: 'adjustments', id: resultId })
        expect(resultId).to.be.a('number')
        return adjustmentsHelper.getAllAdjustments()
          .then(function ([actualAdjustment]) {
            expect(actualAdjustment.id).to.equal(resultId)
            expect(actualAdjustment.workload_owner_id).to.equal(cmsAdjustmentToInsert.workloadOwnerId)
            expect(actualAdjustment.contact_id).to.equal(cmsAdjustmentToInsert.contactId)
            expect(actualAdjustment.points).to.equal(cmsAdjustmentToInsert.points)
            expect(actualAdjustment.adjustment_reason_id).to.equal(cmsAdjustmentToInsert.adjustmentReasonId)
            expect(actualAdjustment.effective_from.toISOString()).to.equal(cmsAdjustmentToInsert.effectiveFrom.toISOString())
            expect(actualAdjustment.effective_to.toISOString()).to.equal(cmsAdjustmentToInsert.effectiveTo.toISOString())
            expect(actualAdjustment.status).to.equal(cmsAdjustmentToInsert.status)
            expect(actualAdjustment.case_ref_no).to.equal(cmsAdjustmentToInsert.crn)
          })
      })
  })

  after(function () {
    return removeIntegrationTestData()
  })
})

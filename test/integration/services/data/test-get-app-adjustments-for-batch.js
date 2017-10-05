const expect = require('chai').expect

const adjustmentsHelper = require('../../../helpers/data/app-adjustments-helper')
const getAdjustments = require('../../../../app/services/data/get-app-adjustments-for-batch')
const adjustmentCategory = require('../../../../app/constants/adjustment-category')
const adjustmentStatus = require('../../../../app/constants/adjustment-status')

var inserts = []
var workloads
var minWorkloadId
var maxWorkloadId

describe('services/data/get-app-adjustments-for-batch', function () {
  before(function () {
    return adjustmentsHelper.insertDependencies(inserts)
    .then(function (builtInserts) {
      inserts = builtInserts
      workloads = inserts.filter((item) => item.table === 'workload')
      minWorkloadId = workloads[0].id
      maxWorkloadId = workloads[workloads.length - 1].id
    })
  })

  it('should retrieve the CMS adjustments in DB, for a given batch of workloads -> workload owners -> adjustments', function () {
    return getAdjustments(adjustmentCategory.CMS, minWorkloadId, maxWorkloadId)
    .then(function (adjustments) {
      var adjustmentIds = []
      adjustments.forEach(function (adjustment) {
        adjustmentIds.push(adjustment.id)
        expect(adjustment.contactId).to.be.not.null // eslint-disable-line
        expect(adjustment.adjustmentReasonId).to.be.equal(1)
        expect(adjustment.status).to.be.equal(adjustmentStatus.ACTIVE)
      })
    })
  })

  it('should retrieve the GS adjustments in DB, for a given batch of workloads -> workload owners -> adjustments', function () {
    return getAdjustments(adjustmentCategory.GS, minWorkloadId, maxWorkloadId)
    .then(function (adjustments) {
      var adjustmentIds = []
      adjustments.forEach(function (adjustment) {
        adjustmentIds.push(adjustment.id)
        expect(adjustment.contactId).to.be.not.null // eslint-disable-line
        expect(adjustment.adjustmentReasonId).to.be.equal(40)
        expect(adjustment.status).to.be.equal(adjustmentStatus.ACTIVE)
      })
    })
  })

  after(function () {
    return adjustmentsHelper.removeDependencies(inserts)
  })
})

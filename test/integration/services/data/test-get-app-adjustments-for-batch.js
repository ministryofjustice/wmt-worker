const expect = require('chai').expect

const adjustmentsHelper = require('../../../helpers/data/app-adjustments-helper')
const appWorkloadHelper = require('../../../helpers/data/app-workload-helper')
const getAdjustments = require('../../../../app/services/data/get-app-adjustments-for-batch')
const adjustmentCategory = require('../../../../app/constants/adjustment-category')
const adjustmentStatus = require('../../../../app/constants/adjustment-status')

var inserts = []
var startStagingId
var endStagingId

describe('services/data/get-app-adjustments-for-batch', function () {
  before(function (done) {
    adjustmentsHelper.insertDependencies(inserts)
    .then(function (builtInserts) {
      inserts = builtInserts
      startStagingId = appWorkloadHelper.maxStagingId + 1
      endStagingId = startStagingId + 2
      done()
    })
  })

  it('should retrieve the CMS adjustments in DB, for a given batch of workload staging ids -> workload owners -> adjustments', function () {
    return getAdjustments(adjustmentCategory.CMS, startStagingId, endStagingId)
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

  it('should retrieve the GS adjustments in DB, for a given batch of workload staging ids -> workload owners -> adjustments', function () {
    return getAdjustments(adjustmentCategory.GS, startStagingId, endStagingId)
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

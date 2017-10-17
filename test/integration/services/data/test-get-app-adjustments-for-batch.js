const expect = require('chai').expect

const adjustmentsHelper = require('../../../helpers/data/app-adjustments-helper')
const getAdjustments = require('../../../../app/services/data/get-app-adjustments-for-batch')
const adjustmentCategory = require('../../../../app/constants/adjustment-category')
const adjustmentStatus = require('../../../../app/constants/adjustment-status')

var inserts = []
var startStagingId
var endStagingId
var workloadReportId

describe('services/data/get-app-adjustments-for-batch', function () {
  before(function (done) {
    adjustmentsHelper.insertDependencies(inserts)
    .then(function (builtInserts) {
      inserts = builtInserts
      startStagingId = 1
      endStagingId = startStagingId + 2
      workloadReportId = inserts.filter((item) => item.table === 'workload_report')[0].id
      done()
    })
  })

  it('should retrieve the CMS adjustments in DB, for a given batch of active workload staging ids -> workload owners -> adjustments', function () {
    return getAdjustments(adjustmentCategory.CMS, startStagingId, endStagingId, workloadReportId)
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

  it('should retrieve the GS adjustments in DB, for a given batch of active workload staging ids -> workload owners -> adjustments', function () {
    return getAdjustments(adjustmentCategory.GS, startStagingId, endStagingId, workloadReportId)
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

  it('should return an empty array if there are no adjustments matching the query criteria', function () {
    return getAdjustments(adjustmentCategory.CMS, endStagingId * 2, endStagingId * 2, workloadReportId + 1)
    .then(function (adjustments) {
      expect(adjustments).to.eql([])
    })
  })

  after(function () {
    return adjustmentsHelper.removeDependencies(inserts)
  })
})

const expect = require('chai').expect

const appWorkloadOwnerHelper = require('../../../helpers/data/app-workload-owner-helper')
const ajustmentsHelper = require('../../../helpers/data/app-adjustments-helper')
const getAdjustments = require('../../../../app/services/data/get-adjustments')
const adjustmentCategory = require('../../../../app/constants/adjustment-category')
const adjustmentStatus = require('../../../../app/constants/adjustment-status')

var inserts = []

describe('services/data/get-adjustments', function () {
  before(function () {
    return appWorkloadOwnerHelper.insertDependencies(inserts)
      .then(function (builtInserts) {
        return ajustmentsHelper.insertDependencies(inserts)
        .then(function (builtInserts) {
          inserts = builtInserts
        })
      })
  })

  it('should retrieve the Contact Management Support adjustments in db', function () {
    return getAdjustments(adjustmentCategory.CMS)
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

  it('should retrieve the Group Supervision adjustments in db', function () {
    return getAdjustments(adjustmentCategory.GS)
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
    return ajustmentsHelper.removeDependencies(inserts)
  })
})

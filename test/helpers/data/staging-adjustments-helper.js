const adjustmentStatus = require('../../../app/constants/adjustment-status')
const dateHelper = require('./date-helper')

module.exports.adjustmentReason = {
  id: 1,
  points: 10
}

module.exports.stagingAdjustmentRows = [
  {
    contactId: 123,
    contactCode: 'abc',
    contactTypeDesc: 'def',
    contactDate: dateHelper.today,
    contactStaffKey: 12,
    contactTeamKey: 13,
    omKey: 14,
    omTeamKey: 15
  }, {
    contactId: 321,
    contactCode: 'cba',
    contactTypeDesc: 'fed',
    contactDate: dateHelper.today,
    contactStaffKey: 21,
    contactTeamKey: 31,
    omKey: 41,
    omTeamKey: 51
  }
]

module.exports.expectedCmsAdjustments = [
  {
    contactId: module.exports.stagingAdjustmentRows[0].contactId,
    workloadOwnerId: 1,
    points: module.exports.adjustmentReason.points,
    adjustmentReasonId: module.exports.adjustmentReason.id,
    effectiveFrom: dateHelper.today,
    effectiveTo: dateHelper.thirtyDays,
    status: adjustmentStatus.ACTIVE
  },
  {
    contactId: module.exports.stagingAdjustmentRows[0].contactId,
    workloadOwnerId: 1,
    points: module.exports.adjustmentReason.points * -1,
    adjustmentReasonId: module.exports.adjustmentReason.id,
    effectiveFrom: dateHelper.today,
    effectiveTo: dateHelper.thirtyDays,
    status: adjustmentStatus.ACTIVE
  },
  {
    contactId: module.exports.stagingAdjustmentRows[1].contactId,
    workloadOwnerId: 1,
    points: module.exports.adjustmentReason.points,
    adjustmentReasonId: module.exports.adjustmentReason.id,
    effectiveFrom: dateHelper.today,
    effectiveTo: dateHelper.thirtyDays,
    status: adjustmentStatus.ACTIVE
  },
  {
    contactId: module.exports.stagingAdjustmentRows[1].contactId,
    workloadOwnerId: 1,
    points: module.exports.adjustmentReason.points * -1,
    adjustmentReasonId: module.exports.adjustmentReason.id,
    effectiveFrom: dateHelper.today,
    effectiveTo: dateHelper.thirtyDays,
    status: adjustmentStatus.ACTIVE
  }
]

module.exports.expectedGsAdjustments = [
  {
    contactId: module.exports.stagingAdjustmentRows[0].contactId,
    workloadOwnerId: 1,
    points: module.exports.adjustmentReason.points * -1,
    adjustmentReasonId: module.exports.adjustmentReason.id,
    effectiveFrom: dateHelper.today,
    effectiveTo: dateHelper.thirtyDays,
    status: adjustmentStatus.ACTIVE
  },
  {
    contactId: module.exports.stagingAdjustmentRows[1].contactId,
    workloadOwnerId: 1,
    points: module.exports.adjustmentReason.points * -1,
    adjustmentReasonId: module.exports.adjustmentReason.id,
    effectiveFrom: dateHelper.today,
    effectiveTo: dateHelper.thirtyDays,
    status: adjustmentStatus.ACTIVE
  }
]

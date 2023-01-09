const adjustmentStatus = require('../../../app/constants/adjustment-status')
const dateHelper = require('./date-helper')
const moment = require('moment')

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
    omTeamKey: 15,
    crn: 'Z6000000'
  }, {
    contactId: 321,
    contactCode: 'cba',
    contactTypeDesc: 'fed',
    contactDate: dateHelper.today,
    contactStaffKey: 21,
    contactTeamKey: 31,
    omKey: 41,
    omTeamKey: 51,
    crn: 'Z7000000'
  }
]

module.exports.stagingAdjustmentRowOlderThanSevenDays = [
  {
    contactId: 123,
    contactCode: 'abc',
    contactTypeDesc: 'def',
    contactDate: dateHelper.eightDaysAgo,
    contactStaffKey: 12,
    contactTeamKey: 13,
    omKey: 14,
    omTeamKey: 15,
    crn: 'Z6000000'
  }
]

module.exports.expectedCmsAdjustments = [
  {
    contactId: module.exports.stagingAdjustmentRows[0].contactId,
    workloadOwnerId: 1,
    points: module.exports.adjustmentReason.points,
    adjustmentReasonId: module.exports.adjustmentReason.id,
    effectiveFrom: moment(dateHelper.today).format('YYYY-MM-DD'),
    effectiveTo: moment(dateHelper.sevenDays).format('YYYY-MM-DD'),
    status: adjustmentStatus.ACTIVE,
    crn: module.exports.stagingAdjustmentRows[0].crn
  },
  {
    contactId: module.exports.stagingAdjustmentRows[0].contactId,
    workloadOwnerId: 1,
    points: module.exports.adjustmentReason.points * -1,
    adjustmentReasonId: module.exports.adjustmentReason.id,
    effectiveFrom: moment(dateHelper.today).format('YYYY-MM-DD'),
    effectiveTo: moment(dateHelper.sevenDays).format('YYYY-MM-DD'),
    status: adjustmentStatus.ACTIVE,
    crn: module.exports.stagingAdjustmentRows[0].crn
  },
  {
    contactId: module.exports.stagingAdjustmentRows[1].contactId,
    workloadOwnerId: 1,
    points: module.exports.adjustmentReason.points,
    adjustmentReasonId: module.exports.adjustmentReason.id,
    effectiveFrom: moment(dateHelper.today).format('YYYY-MM-DD'),
    effectiveTo: moment(dateHelper.sevenDays).format('YYYY-MM-DD'),
    status: adjustmentStatus.ACTIVE,
    crn: module.exports.stagingAdjustmentRows[1].crn
  },
  {
    contactId: module.exports.stagingAdjustmentRows[1].contactId,
    workloadOwnerId: 1,
    points: module.exports.adjustmentReason.points * -1,
    adjustmentReasonId: module.exports.adjustmentReason.id,
    effectiveFrom: moment(dateHelper.today).format('YYYY-MM-DD'),
    effectiveTo: moment(dateHelper.sevenDays).format('YYYY-MM-DD'),
    status: adjustmentStatus.ACTIVE,
    crn: module.exports.stagingAdjustmentRows[1].crn
  }
]

const reductionStatus = require('../../../app/constants/reduction-status')
const reductionContactType = require('../../../app/constants/reduction-contact-type')

var now = new Date()
var thirtyDays = new Date(now)
thirtyDays.setDate(thirtyDays.getDate() + 30)

module.exports.reductionReason = {
  id: 1,
  fixedAllowanceHours: 0.5
}

module.exports.reductionRows = [{
  contactId: 123,
  contactCode: 'abc',
  contactTypeDesc: 'def',
  contactDate: now,
  contactStaffKey: 12,
  contactTeamKey: 13,
  omKey: 14,
  omTeamKey: 15
}, {
  contactId: 321,
  contactCode: 'cba',
  contactTypeDesc: 'fed',
  contactDate: now,
  contactStaffKey: 21,
  contactTeamKey: 31,
  omKey: 41,
  omTeamKey: 51
}]

module.exports.expectedCmsReductions = [
  {
    contactId: module.exports.reductionRows[0].contactId,
    workloadOwnerId: 1,
    hours: module.exports.reductionReason.fixedAllowanceHours,
    reductionReasonId: module.exports.reductionReason.id,
    effectiveFrom: now,
    effectiveTo: thirtyDays,
    status: reductionStatus.ACTIVE,
    note: null,
    contactType: reductionContactType.CMS
  },
  {
    contactId: module.exports.reductionRows[0].contactId,
    workloadOwnerId: 1,
    hours: module.exports.reductionReason.fixedAllowanceHours * -1,
    reductionReasonId: module.exports.reductionReason.id,
    effectiveFrom: now,
    effectiveTo: thirtyDays,
    status: reductionStatus.ACTIVE,
    note: null,
    contactType: reductionContactType.CMS
  },
  {
    contactId: module.exports.reductionRows[1].contactId,
    workloadOwnerId: 1,
    hours: module.exports.reductionReason.fixedAllowanceHours,
    reductionReasonId: module.exports.reductionReason.id,
    effectiveFrom: now,
    effectiveTo: thirtyDays,
    status: reductionStatus.ACTIVE,
    note: null,
    contactType: reductionContactType.CMS
  },
  {
    contactId: module.exports.reductionRows[1].contactId,
    workloadOwnerId: 1,
    hours: module.exports.reductionReason.fixedAllowanceHours * -1,
    reductionReasonId: module.exports.reductionReason.id,
    effectiveFrom: now,
    effectiveTo: thirtyDays,
    status: reductionStatus.ACTIVE,
    note: null,
    contactType: reductionContactType.CMS
  }
]

module.exports.expectedGsReductions = [
  {
    contactId: module.exports.reductionRows[0].contactId,
    workloadOwnerId: 1,
    hours: module.exports.reductionReason.fixedAllowanceHours * -1,
    reductionReasonId: module.exports.reductionReason.id,
    effectiveFrom: now,
    effectiveTo: thirtyDays,
    status: reductionStatus.ACTIVE,
    note: null,
    contactType: reductionContactType.GS
  },
  {
    contactId: module.exports.reductionRows[1].contactId,
    workloadOwnerId: 1,
    hours: module.exports.reductionReason.fixedAllowanceHours * -1,
    reductionReasonId: module.exports.reductionReason.id,
    effectiveFrom: now,
    effectiveTo: thirtyDays,
    status: reductionStatus.ACTIVE,
    note: null,
    contactType: reductionContactType.GS
  }
]
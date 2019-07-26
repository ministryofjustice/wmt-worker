const knex = require('../../../knex').appSchema

module.exports = function (adjustment) {
  return knex('adjustments')
  .insert({
    adjustment_reason_id: adjustment.adjustmentReasonId,
    workload_owner_id: adjustment.workloadOwnerId,
    points: adjustment.points,
    effective_from: adjustment.effectiveFrom,
    effective_to: adjustment.effectiveTo,
    status: adjustment.status,
    contact_id: adjustment.contactId,
    case_ref_no: adjustment.crn
  })
  .returning('id')
  .then(function (result) {
    return result[0]
  })
}

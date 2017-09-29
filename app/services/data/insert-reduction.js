const knexConfig = require('../../../knexfile').app
const knex = require('knex')(knexConfig)

module.exports = function (reduction) {
  return knex('reductions')
  .insert({
    reduction_reason_id: reduction.reductionReasonId,
    workload_owner_id: reduction.workloadOwnerId,
    hours: reduction.hours,
    effective_from: reduction.effectiveFrom,
    effective_to: reduction.effectiveTo,
    status: reduction.status,
    contact_id: reduction.contactId,
    notes: reduction.notes,
    contact_type: reduction.contactType
  })
  .returning('id')
  .then(function (result) {
    return result[0]
  })
}

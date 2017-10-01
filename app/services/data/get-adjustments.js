const knexConfig = require('../../../knexfile').app
const knex = require('knex')(knexConfig)

const adjustmentStatus = require('../../constants/adjustment-status')

module.exports = function (category) {
  return knex('adjustments')
    .join('adjustment_reason', 'adjustment_reason.id', 'adjustments.adjustment_reason_id')
    .whereNotNull('contact_id')
    .andWhere('status', adjustmentStatus.ACTIVE)
    .andWhere('adjustment_reason.category_id', category)
    .select('adjustments.id AS id',
      'workload_owner_id AS workloadOwnerId',
      'contact_id AS contactId',
      'adjustments.points AS points',
      'adjustments.adjustment_reason_id AS adjustmentReasonId',
      'adjustments.status AS status')
}

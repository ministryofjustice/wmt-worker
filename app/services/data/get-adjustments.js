const knexConfig = require('../../../knexfile').app
const knex = require('knex')(knexConfig)

const reductionStatus = require('../../constants/reduction-status')

module.exports = function (category) {
  return knex('adjustments')
    .join('adjustment_reason', 'adjustment_reason.id', 'adjustments.adjustment_reason_id')
    .whereNotNull('contact_id')
    .andWhere('status', reductionStatus.ACTIVE)
    .andWhere('adjustment_reason.category_id', category)
    .select('id',
      'workload_owner_id AS workloadOwnerId',
      'contact_id AS contactId',
      'points AS points')
}

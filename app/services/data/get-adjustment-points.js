const knexConfig = require('../../../knexfile').app
const knex = require('knex')(knexConfig)
const reductionStatus = require('../../constants/reduction-status')

module.exports = function (workloadOwnerId, category) {
  return knex('adjustments')
    .join('adjustment_reason', 'adjustment_reason.id', 'adjustments.adjustment_reason_id')
    .sum('points AS points')
    .where('workload_owner_id', workloadOwnerId)
    .whereNotNull('contact_id')
    .andWhere('status', reductionStatus.ACTIVE)
    .andWhere('adjustment_reason.category_id', category)
    .then(function (result) {
      if (result === null || result[0].points === null) {
        return 0
      } else {
        return result[0].points
      }
    })
}

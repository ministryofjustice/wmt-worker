const knex = require('../../../knex').appSchema
const adjustmentStatus = require('../../constants/adjustment-status')

module.exports = function (workloadOwnerId, category) {
  return knex('adjustments')
    .withSchema('app')
    .join('adjustment_reason', 'adjustment_reason.id', 'adjustments.adjustment_reason_id')
    .sum('adjustments.points AS points')
    .where('workload_owner_id', workloadOwnerId)
    .andWhere('status', adjustmentStatus.ACTIVE)
    .andWhere('adjustment_reason.category_id', category)
    .then(function (result) {
      if (result === null || result[0].points === null) {
        return 0
      } else {
        return result[0].points
      }
    })
}

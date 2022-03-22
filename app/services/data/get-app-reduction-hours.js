const knex = require('../../../knex').appSchema
const reductionStatus = require('../../constants/reduction-status')

module.exports = function (workloadOwnerId) {
  return knex('reductions')
    .withSchema('app')
    .join('reduction_reason', 'reductions.reduction_reason_id', 'reduction_reason.id')
    .sum('hours AS hours')
    .where('workload_owner_id', workloadOwnerId)
    .andWhere('status', reductionStatus.ACTIVE)
    .andWhere('reduction_reason.is_enabled', true)
    .then(function (result) {
      if (result === null || result[0].hours === null) {
        return 0
      } else {
        return result[0].hours
      }
    })
}

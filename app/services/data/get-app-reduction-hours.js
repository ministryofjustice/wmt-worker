const knex = require('../../../knex').appSchema
const reductionStatus = require('../../constants/reduction-status')

module.exports = function (workloadOwnerId) {
  return knex('reductions')
    .withSchema('app')
    .sum('hours AS hours')
    .where('workload_owner_id', workloadOwnerId)
    .andWhere('status', reductionStatus.ACTIVE)
    .then(function (result) {
      if (result === null || result[0].hours === null) {
        return 0
      } else {
        return result[0].hours
      }
    })
}

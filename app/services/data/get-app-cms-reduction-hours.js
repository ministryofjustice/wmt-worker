const knexConfig = require('../../../knexfile').app
const knex = require('knex')(knexConfig)
const reductionStatus = require('../../constants/reduction-status')

module.exports = function (workloadOwnerId) {
  return knex('reductions')
    .sum('hours AS hours')
    .where('workload_owner_id', workloadOwnerId)
    .whereNotNull('contact_id')
    .andWhere('status', reductionStatus.ACTIVE)
    .then(function (result) {
      if (result === null || result[0].hours === null) {
        return 0
      } else {
        return result[0].hours
      }
    })
}

const knexConfig = require('../../../knexfile').app
const knex = require('knex')(knexConfig)

module.exports = function (workloadOwnerId) {
  return knex('reductions').withSchema('app')
    .sum('hours AS hours')
    .where('workload_owner_id', workloadOwnerId)
    .where('effective_from', '<=', knex.fn.now())
    .andWhere('effective_to', '>=', knex.fn.now())
    .then(function (result) {
      if (result === null || result[0].hours === null) {
        return 0
      } else {
        return result[0].hours
      }
    })
}

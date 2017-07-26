const knexConfig = require('../../../knexfile').app
const knex = require('knex')(knexConfig)

module.exports = function (workloadOwnerId) {
  return knex('workload_owner').withSchema('app')
    .join('offender_manager', 'workload_owner.offender_manager_id', '=', 'offender_manager.id')
    .where('workload_owner.id', workloadOwnerId)
    .first('offender_manager.type_id')
    .then((result) => result.type_id)
}

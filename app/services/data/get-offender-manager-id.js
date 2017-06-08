const knexConfig = require('../../../knexfile').development
const knex = require('knex')(knexConfig)

module.exports = function (workloadOwnerId) {
  return knex('workload_owner').select('offender_manager.om_type_id')
    .join('offender_manager', 'workload_owner.offender_manager_id', '=', 'offender_manager.id')
    .where('id', workloadOwnerId)
    .then(function (result) {
      return result.offender_manager_id
    })
}

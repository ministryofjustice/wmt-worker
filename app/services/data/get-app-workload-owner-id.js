const knexConfig = require('../../../knexfile').app
const knex = require('knex')(knexConfig)

module.exports = function (offenderManagerKey, teamCode) {
  return knex('workload_owner')
    .join('offender_manager', 'offender_manager.id', 'workload_owner.offender_manager_id')
    .join('team', 'team.id', 'workload_owner.team_id')
    .where('offender_manager.key', offenderManagerKey)
    .andWhere('team.code', teamCode)
    .first('workload_owner.id')
    .then(function (results) {
      return results.id
    })
}

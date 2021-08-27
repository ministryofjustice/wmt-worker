const knex = require('../../../knex').appSchema

module.exports = function (omKey, teamCode) {
  return knex('workload_owner')
    .join('team', 'workload_owner.team_id', 'team.id')
    .join('offender_manager', 'workload_owner.offender_manager_id', 'offender_manager.id')
    .first('workload_owner.id AS woId')
    .where('team.code', teamCode)
    .where('offender_manager.key', omKey)
}

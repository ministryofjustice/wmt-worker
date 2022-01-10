const knex = require('../../../knex').appSchema

module.exports = function (omKey, teamCode) {
  return knex('workload_owner')
    .withSchema('app')
    .join('team', 'workload_owner.team_id', 'team.id')
    .join('offender_manager', 'workload_owner.offender_manager_id', 'offender_manager.id')
    .join('ldu', 'ldu.id', 'team.ldu_id')
    .join('region', 'region.id', 'ldu.region_id')
    .first('workload_owner.id AS woId',
      'workload_owner.contracted_hours as contractedHours',
      'offender_manager.forename AS forename',
      'offender_manager.surname AS surname',
      'team.code AS teamCode',
      'team.description AS teamDescription',
      'ldu.code AS lduCode',
      'ldu.description AS lduDescription',
      'region.code AS regionCode',
      'region.description AS regionDescription')
    .where('team.code', teamCode)
    .where('offender_manager.key', omKey)
}

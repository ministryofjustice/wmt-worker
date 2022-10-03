const knex = require('../../../knex').appSchema

module.exports = function (workloadOwnerId) {
  return knex('workload_owner').withSchema('app')
    .join('offender_manager', 'workload_owner.offender_manager_id', '=', 'offender_manager.id')
    .join('team', 'workload_owner.team', '=', 'team.id')
    .where('workload_owner.id', workloadOwnerId)
    .first('offender_manager.key', 'team.code')
    .then((result) => ({ staffCode: result.key, teamCode: result.code }))
}

const knex = require('../../../knex').appSchema

module.exports = function () {
  return knex('offender_manager')
    .withSchema('app')
    .select('offender_manager.key', knex.raw('string_agg(workload_owner.id || \'\',\',\') as duplicate_ids'), knex.raw('max(workload_owner.id) as maximum_workload_owner_id'))
    .join('workload_owner', 'offender_manager.id', 'workload_owner.offender_manager_id')
    .groupBy('offender_manager.key')
    .havingRaw('count(workload_owner.id) > ?', [1])
}

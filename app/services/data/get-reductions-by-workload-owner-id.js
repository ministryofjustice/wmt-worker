const knex = require('../../../knex').appSchema

module.exports = function (workloadOwnerId) {
  return knex.select().from('reductions')
    .withSchema('app')
    .where('workload_owner_id', workloadOwnerId)
    .select('reduction_reason_id', 'hours', 'effective_from', 'effective_to', 'status', 'notes', 'user_id')
}

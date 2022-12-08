const knex = require('../../../knex').appSchema

module.exports = function (workloadOwnerId) {
  return knex('workload_owner').withSchema('app')
    .where('workload_owner.id', workloadOwnerId)
    .first('workload_owner.contracted_hours AS contractedHours')
    .then(({ contractedHours }) => contractedHours)
}

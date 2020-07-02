const knex = require('../../../knex').appSchema

module.exports = function (workloadOwnerId, contractedHours) {
  return knex('workload_owner')
    .where('id', workloadOwnerId)
    .update('contracted_hours', contractedHours)
}

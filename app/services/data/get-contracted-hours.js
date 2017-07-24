const knexConfig = require('../../../knexfile').app
const knex = require('knex')(knexConfig)

module.exports = function (workloadOwnerId) {
  return knex('workload_owner').withSchema('app')
    .where('id', workloadOwnerId)
    .first('contracted_hours')
    .then((result) => result.contracted_hours)
}

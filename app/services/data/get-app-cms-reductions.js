const knexConfig = require('../../../knexfile').app
const knex = require('knex')(knexConfig)

module.exports = function () {
  return knex('reductions')
    .whereNotNull('contact_id')
    .select('id',
      'workload_owner_id AS workloadOwnerId',
      'contact_id AS contactId',
      'hours AS hours')
}

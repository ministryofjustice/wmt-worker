const knexConfig = require('../../../knexfile').app
const knex = require('knex')(knexConfig)

const reductionStatus = require('../../constants/reduction-status')

module.exports = function () {
  return knex('reductions')
    .whereNotNull('contact_id')
    .andWhere('status', reductionStatus.ACTIVE)
    .select('id',
      'workload_owner_id AS workloadOwnerId',
      'contact_id AS contactId',
      'hours AS hours')
}

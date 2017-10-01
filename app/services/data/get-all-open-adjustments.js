const knexConfig = require('../../../knexfile').app
const knex = require('knex')(knexConfig)

module.exports = function () {
  return knex('adjustments')
    .select(
      'id AS id',
      'effective_from AS effectiveFrom',
      'effective_to AS effectiveTo',
      'status AS status'
    )
    .whereNull('status')
    .orWhereIn('status', ['SCHEDULED', 'ACTIVE'])
}

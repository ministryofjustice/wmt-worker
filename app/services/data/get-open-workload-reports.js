const config = require('../../../knexfile').app
const knex = require('knex')(config)

module.exports = function () {
  return knex('workload_report')
    .whereNull('effective_to')
    .andWhereNot('effective_from', null)
    .select(
      'id',
      'effective_from'
    )
}

const config = require('../../../knexfile').app
const knex = require('knex')(config)

module.exports = function () {
  return knex('workload_report')
    .whereNull('effective_to')
    .select([
      'id',
      'effective_from'
    ])
}

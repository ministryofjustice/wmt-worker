const knexConfig = require('../../../knexfile').app
const knex = require('knex')(knexConfig)

module.exports = function (id, effectiveTo) {
  return knex('workload_report')
    .where('id', id)
    .update('effective_to', effectiveTo)
}

const knexConfig = require('../../../knexfile').app
const knex = require('knex')(knexConfig)

module.exports = function () {
  return knex('reductions')
    .select()
    .whereNull('status')
    .orWhereIn('status', ['SCHEDULED', 'ACTIVE'])
}

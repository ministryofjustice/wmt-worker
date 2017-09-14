const knexConfig = require('../../../knexfile').app
const knex = require('knex')(knexConfig)

module.exports = function () {
  return knex('reductions')
    .whereNotNull('contact_id')
    .select('id', 'contact_id AS contactId')
}

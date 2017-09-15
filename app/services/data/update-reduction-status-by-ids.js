const config = require('../../../knexfile').app
const knex = require('knex')(config)

module.exports = function (ids, status) {
  return knex('reductions').whereIn('id', ids)
        .update('status', status)
}

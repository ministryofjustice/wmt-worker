const config = require('../../../knexfile').development
const knex = require('knex')(config)

module.exports = function (ids, status) {
  return knex('tasks').whereIn('id', ids)
        .update('status', status)
}

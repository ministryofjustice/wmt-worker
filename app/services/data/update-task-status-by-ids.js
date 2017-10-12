const knex = require('../../../knex').appSchema

module.exports = function (ids, status) {
  return knex('tasks').whereIn('id', ids)
        .update('status', status)
}

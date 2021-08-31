const knex = require('../../../knex').appSchema

module.exports = function (ids, status) {
  return knex('tasks').withSchema('app').whereIn('id', ids)
    .update({
      status: status,
      date_started: new Date()
    })
}

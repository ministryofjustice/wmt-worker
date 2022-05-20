const knex = require('../../../knex').appSchema

module.exports = function (taskId, status) {
  return knex('tasks').withSchema('app').where('id', taskId)
    .update({
      status,
      date_processed: new Date()
    })
}

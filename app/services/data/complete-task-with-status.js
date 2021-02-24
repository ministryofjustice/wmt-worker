const knex = require('../../../knex').appSchema

module.exports = function (taskId, status) {
  return knex('tasks').where('id', taskId)
    .update({
      status: status,
      date_processed: new Date()
    })
}

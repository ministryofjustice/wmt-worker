const knex = require('../../../knex').appSchema
const taskStatus = require('../../constants/task-status')
module.exports = function (ids, status) {
  return knex('tasks').withSchema('app').where('status', taskStatus.INPROGRESS)
    .update({
      status: taskStatus.PENDING
    })
}

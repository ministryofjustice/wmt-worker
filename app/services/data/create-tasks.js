const config = require('../../../knexfile').app
const knex = require('knex')(config)
const TaskStatus = require('../../constants/task-status')

module.exports = function (tasks) {
  var dbTasks = []
  tasks.forEach(function (task) {
    var dbTask = {
      submitting_agent: task.submittingAgent,
      type: task.type,
      additional_data: JSON.stringify(task.additionalData),
      date_created: task.dateCreated,
      status: TaskStatus.PENDING
    }
    dbTasks.push(dbTask)
  })
  return knex('tasks').insert(dbTasks)
}

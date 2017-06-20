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
      workload_report_id: task.workloadReportId,
      date_created: task.dateCreated,
      status: TaskStatus.PENDING
    }
    dbTasks.push(dbTask)
  })
  return knex('tasks').returning('id').insert(dbTasks)
}

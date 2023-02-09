const knex = require('../../../knex').appSchema
const TaskStatus = require('../../constants/task-status')

module.exports = function (tasks) {
  const dbTasks = []
  tasks.forEach(function (task) {
    const dbTask = {
      submitting_agent: task.submittingAgent,
      type: task.type,
      additional_data: JSON.stringify(task.additionalData),
      workload_report_id: task.workloadReportId,
      date_created: task.dateCreated,
      status: task.status ? task.status : TaskStatus.PENDING // default value is the status the incoming task otherwise it's pending
    }
    dbTasks.push(dbTask)
  })
  // Default to ((2100 / 7) - 1). This is to avoid 2100 parameter server error.
  // 7 is the number columns in this table and 2100 is number of max parameters.
  let batchSize = 299
  if (dbTasks.length > 40) {
    batchSize = Math.floor(dbTasks.length / 7) + 1
  }
  return knex.batchInsert('app.tasks', dbTasks, batchSize).returning('id').then(function (results) {
    return results.map((result) => result.id)
  })
}

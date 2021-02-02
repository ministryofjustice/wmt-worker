const knex = require('../../../knex').appSchema
const taskStatus = require('../../constants/task-status')
const updateTaskStatusByIds = require('./update-task-status-by-ids')
const Task = require('../domain/task')

module.exports = function (batchSize) {
  return knex.select().table('tasks')
    .where('status', taskStatus.PENDING)
    .orderBy('date_created', 'asc')
    .limit(batchSize)
    .then(function (results) {
      const tasks = []
      const ids = []
      if (results !== 'undefined' && results.length > 0) {
        for (const result of results) {
          ids.push(result.id)
          tasks.push(new Task(
            result.id,
            result.submitting_agent,
            result.type,
            JSON.parse(result.additional_data),
            result.workload_report_id,
            result.date_created,
            result.date_processed,
            taskStatus.INPROGRESS,
            result.date_started))
        }
      } else {
        return []
      }
      return updateTaskStatusByIds(ids, taskStatus.INPROGRESS)
        .then(function () {
          return tasks
        })
    })
}

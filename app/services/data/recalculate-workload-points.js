const knex = require('../../../knex').appSchema
const taskStatus = require('../../constants/task-status')
const dateFormatter = require('../date-formatter')

module.exports = function (reportId) {
  var columns = [
    'type',
    'additional_data',
    'workload_report_id'
  ]

  return knex('tasks')
  .where({
    'type': taskTypes.CALCULATE_WORKLOAD_POINTS,
    'submitting_agent': 'WORKER',
    'workload_report_id': reportId
  })
  .columns(columns)
  .then(function (tasks) {
    tasks.forEach(function (task) {
      task.submitting_agent = 'WEB'
      task.additional_data = task.additional_data.replace('INSERT', 'UPDATE')
      task.workload_report_id = reportId
      task.date_created = dateFormatter.now().toDate()
      task.date_processed = null
      task.status = taskStatus.PENDING
    })

    var batchSize = 299
    if (tasks.length > 40) {
      batchSize = Math.floor(tasks.length / 7) + 1
    }

    return knex.batchInsert('tasks', tasks, batchSize)
  })
}

const knex = require('../../../knex').appSchema
const tasksTable = 'tasks'
const taskStatus = require('../../constants/task-status')

module.exports = function (taskType, workloadReportId) {
  return knex(tasksTable)
    .withSchema('app')
    .update('status', taskStatus.PENDING)
    .where('type', taskType)
    .andWhere('workload_report_id', workloadReportId)
    .andWhere('status', taskStatus.AWAITING_DUPLICATE_CHECK)
}

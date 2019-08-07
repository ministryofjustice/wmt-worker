const config = require('../../../config')
const knex = require('../../../knex').appSchema
const tasksTable = `${config.DB_APP_SCHEMA}.tasks`
const taskStatus = require('../../constants/task-status')

module.exports = function (taskType, workloadReportId) {
  return knex(tasksTable)
    .update('status', taskStatus.PENDING)
    .where('type', taskType)
    .andWhere('workload_report_id', workloadReportId)
    .andWhere('status', taskStatus.AWAITING_DUPLICATE_CHECK)
}

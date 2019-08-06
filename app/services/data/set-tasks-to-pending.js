const config = require('../../../config')
const knex = require('../../../knex').appSchema
const tasksTable = `${config.DB_APP_SCHEMA}.tasks`
const taskStatus = require('../../constants/task-status')

module.exports = function (taskType, workload_report_id) {
  return knex(tasksTable)
    .update('status', taskStatus.PENDING)
    .where('type', taskType)
    .andwhere('workload_report_id', workload_report_id)
    .andwhere('status', taskStatus.AWAITING_DUPLICATE_CHECK)
}

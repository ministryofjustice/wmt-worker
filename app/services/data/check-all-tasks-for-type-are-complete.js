const knex = require('../../../knex').appSchema
const taskStatus = require('../../constants/task-status')

module.exports = function (taskType, workloadReportId) {
  return knex('tasks')
    .withSchema('app')
    .count('* AS theCount')
    .where('workload_report_id', workloadReportId)
    .andWhere('type', taskType)
    .unionAll(function () {
      this.from('tasks')
        .withSchema('app')
        .count('* AS theCount')
        .where('workload_report_id', workloadReportId)
        .andWhere('type', taskType)
        .andWhere('status', taskStatus.COMPLETE)
    })
    .then(function (results) {
      return results[0].theCount === results[1].theCount
    })
}

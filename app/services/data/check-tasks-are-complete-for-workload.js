const knex = require('../../../knex').appSchema
const taskStatus = require('../../constants/task-status')

module.exports = function (workloadReportId) {
  return knex('tasks').withSchema('app')
    .where('status', '!=', taskStatus.COMPLETE)
    .where('workload_report_id', workloadReportId)
    .count('* AS theCount')
    .then(function (results) {
      return results[0].theCount === 0
    })
}

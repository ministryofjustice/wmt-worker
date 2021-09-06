const knex = require('../../../knex').appSchema
const taskType = require('../../constants/task-type')

module.exports = function (thisTaskType, workloadReportId) {
  let query = knex('tasks').withSchema('app')
    .select(knex.raw('Count(additional_data) AS theCount'), 'additional_data AS additionalData', 'workload_report_id AS workloadReportId')
    .where('type', thisTaskType)
    .andWhere('workload_report_id', workloadReportId)
    .groupBy('additional_data', 'workload_report_id')
    .having(knex.raw('Count(additional_data)'), '>', 1)

  if (thisTaskType === taskType.CALCULATE_WORKLOAD_POINTS || thisTaskType === taskType.COURT_REPORTS_CALCULATION) {
    query = query.andWhere('additional_data', 'like', '%INSERT%')
  }
  return query
}

const knex = require('../../../knex').appSchema
const taskType = require('../../constants/task-type')

module.exports = function (thisTaskType, workloadReportId) {
  if (thisTaskType === taskType.CALCULATE_WORKLOAD_POINTS || thisTaskType === taskType.COURT_REPORTS_CALCULATION) {
    return knex.schema.raw(
      "SELECT Count(additional_data) AS theCount, additional_data AS additionalData, workload_report_id AS workloadReportId FROM app.tasks WHERE [type] = '" + thisTaskType + "' AND additional_data like '%INSERT%' AND workload_report_id = " + workloadReportId + ' GROUP BY additional_data, workload_report_id HAVING Count(additional_data) > 1'
    )
  } else {
    return knex.schema.raw(
      "SELECT Count(additional_data) AS theCount, additional_data AS additionalData, workload_report_id AS workloadReportId FROM app.tasks WHERE [type] = '" + thisTaskType + "' AND workload_report_id = " + workloadReportId + ' GROUP BY additional_data, workload_report_id HAVING Count(additional_data) > 1'
    )
  }
}

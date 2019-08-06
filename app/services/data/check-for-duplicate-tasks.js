const knex = require('../../../knex').appSchema
const taskType = require('../../constants/task-type')

module.exports = function (thisTaskType, workload_report_id) {
  if (thisTaskType === taskType.CALCULATE_WORKLOAD_POINTS || thisTaskType === taskType.COURT_REPORTS_CALCULATION) {
    return knex.schema.raw(
      "SELECT Count(additional_data) AS theCount, additional_data, workload_report_id FROM app.tasks WHERE [type] = '" + thisTaskType + "' AND additional_data like '%INSERT%' AND workload_report_id = " + workload_report_id + " GROUP BY additional_data, workload_report_id HAVING Count(additional_data) > 1"
    )
  } else {
    return knex.schema.raw(
      "SELECT Count(additional_data) AS theCount, additional_data, workload_report_id FROM app.tasks WHERE [type] = '" + thisTaskType + "' AND workload_report_id = " + workload_report_id + " GROUP BY additional_data, workload_report_id HAVING Count(additional_data) > 1"
    )
  }
}
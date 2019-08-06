const knex = require('../../../knex').appSchema

module.exports = function (additionalData, thisTaskType, workloadReportId, limit) {
  return knex('task')
    .where('additional_data', additionalData)
    .andWhere('workload_report_id', workloadReportId)
    .andWhere('type', thisTaskType)
    .limit(limit - 1)
    .del()
}

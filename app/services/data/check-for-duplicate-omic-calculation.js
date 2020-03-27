const knex = require('../../../knex').appSchema

module.exports = function (reportId, workloadId) {
  return knex('omic_workload_points_calculations')
    .where('workload_report_id', reportId)
    .andWhere('omic_workload_id', workloadId)
    .first('omic_workload_id')
}

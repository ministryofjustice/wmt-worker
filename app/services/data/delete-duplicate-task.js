const knex = require('../../../knex').appSchema

module.exports = function (additional_data, thisTaskType, workload_report_id, limit) {
  return knex('task')
    .where('additional_data', additional_data)
    .andWhere('workload_report_id', workload_report_id)
    .andWhere('type', thisTaskType)
    .limit(limit - 1)
    .del()
}

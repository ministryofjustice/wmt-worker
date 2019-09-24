const knex = require('../../../knex').appSchema

module.exports = function (additionalData, thisTaskType, workloadReportId, limit) {
  return knex('tasks')
    .select('id')
    .where('additional_data', additionalData)
    .andWhere('workload_report_id', workloadReportId)
    .andWhere('type', thisTaskType)
    .limit(limit - 1)
    .then(function (results) {
      var ids = []
      if (results) {
        results.forEach(function (result) {
          ids.push(result['id'])
        })
      }
      return knex('tasks')
        .whereIn('id', ids)
        .del()
    })
}

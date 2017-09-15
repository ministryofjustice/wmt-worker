const knexConfig = require('../../../knexfile').app
const knex = require('knex')(knexConfig)

module.exports = function (workloadReportId, status) {
  return knex('workload_report')
  .where('id', workloadReportId)
  .update({
    status: status,
    status_description: status
  })
}

const knexConfig = require('../../../knexfile').app
const knex = require('knex')(knexConfig)

module.exports = function (workloadReportId, status) {
  return knex('workload_report').where('id', workloadReportId)
    .update({
      effective_to: new Date(),
      status: status,
      status_description: status
    }).then((result) => {
      return result
    })
}

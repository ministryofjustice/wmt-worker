const knexConfig = require('../../../knexfile').app
const knex = require('knex')(knexConfig)

module.exports = function (workloadId, status) {
  return knex('workload_report').where('id', workloadId)
    .update({
      effective_to: new Date(),
      status: status,
      status_description: status
    }).then((result) => {
      return result
    })
}

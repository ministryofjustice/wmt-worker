const knexConfig = require('../../../knexfile').app
const knex = require('knex')(knexConfig)

module.exports = function () {
  return knex('tasks')
    .select('id', 'workload_report_id', 'status')
    .then(function (results) {
      return results
    })
}

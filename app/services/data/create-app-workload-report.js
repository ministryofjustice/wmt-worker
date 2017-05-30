// Update previous report to effective_to = now and mark new report with effective_from now
const config = require('../../../config')
const knexConfig = require('../../../knexfile').development
const knex = require('knex')(knexConfig)

module.exports = function (workload) {
  return knex(`${config.DB_APP_SCHEMA}.workload`)
    .insert(workload)
    .then(function (result) {
      return result.id
    })
}

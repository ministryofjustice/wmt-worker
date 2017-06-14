const config = require('../../../config')
const knexConfig = require('../../../knexfile').development
const knex = require('knex')(knexConfig)

module.exports = function (workingHours) {
  return knex(`${config.DB_APP_SCHEMA}.working_hours`)
    .insert(workingHours)
    .returning('id')
}

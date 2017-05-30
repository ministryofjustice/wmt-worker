const config = require('../../../config')
const knexConfig = require('../../../knexfile').development
const knex = require('knex')(knexConfig)

module.exports = function (team) {
  return knex(`${config.DB_APP_SCHEMA}.team`)
    .insert(team)
    .returning('id')
}

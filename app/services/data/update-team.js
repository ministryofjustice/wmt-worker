const config = require('../../../config')
const knex = require('../../../knex').appSchema
const teamTable = `${config.DB_APP_SCHEMA}.team`

module.exports = function (team) {
  return knex(teamTable)
    .update('description', team.description)
    .update('ldu_id', team.ldu_id)
    .where({ code: team.code })
    .returning('id')
}

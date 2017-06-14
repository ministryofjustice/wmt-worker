const config = require('../../../config')
const knexConfig = require('../../../knexfile').development
const knex = require('knex')(knexConfig)
const teamTable = `${config.DB_APP_SCHEMA}.team`

module.exports = function (team) {
  var teamId
  var teamDbObject = {}

  teamDbObject.ldu_id = team.lduId
  teamDbObject.code = team.code
  teamDbObject.description = team.description
  teamDbObject.effective_from = team.effectiveFrom
  teamDbObject.effective_to = team.effectiveTo

  return knex.select().from(teamTable)
    .where('code', teamDbObject.code)
    .first()
    .then(function (result) {
      if (result === undefined) {
        return knex(teamTable)
          .insert(teamDbObject)
          .returning('id')
      } else {
        teamId = result['id']
      }
      return teamId
    })
}

const config = require('../../../config')
const knex = require('../../../knex').appSchema
const teamTable = `${config.DB_APP_SCHEMA}.team`
const updateTeam = require('./update-team')

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
        // check if team name is still the same
        // if it isn't, update
        if (result['description'] !== teamDbObject.description) {
          return updateTeam(teamDbObject)
            .then(function (id) {
              return id
            })
        }
        teamId = result['id']
      }
      return teamId
    })
}

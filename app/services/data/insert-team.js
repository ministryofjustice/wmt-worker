const knex = require('../../../knex').appSchema
const teamTable = 'team'
const updateTeam = require('./update-team')

module.exports = function (team) {
  let teamId
  const teamDbObject = {}

  teamDbObject.ldu_id = team.lduId
  teamDbObject.code = team.code
  teamDbObject.description = team.description
  teamDbObject.effective_from = team.effectiveFrom
  teamDbObject.effective_to = team.effectiveTo

  return knex.select().withSchema('app').from(teamTable)
    .where('code', teamDbObject.code)
    .first()
    .then(function (result) {
      if (result === undefined) {
        return knex(teamTable)
          .withSchema('app')
          .insert(teamDbObject)
          .returning('id')
      } else {
        // check if team name is still the same
        // if it isn't, update
        if (result.description !== teamDbObject.description || result.ldu_id !== teamDbObject.ldu_id) {
          return updateTeam(teamDbObject)
            .then(function (id) {
              return id
            })
        }
        teamId = result.id
      }
      return teamId
    })
}

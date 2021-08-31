const knex = require('../../../knex').appSchema
const getOffenderManagerBykey = require('./get-offender-manager-by-key')
const getTeamByCode = require('./get-team-by-code')

module.exports = function (offenderManagerKey, teamCode) {
  let offenderManagerId
  let teamId

  return getOffenderManagerBykey(offenderManagerKey)
    .then(function (offenderManager) {
      if (offenderManager !== undefined) {
        offenderManagerId = offenderManager.id
        return getTeamByCode(teamCode)
          .then(function (team) {
            if (team !== undefined) {
              teamId = team.id
              return knex('workload_owner')
                .withSchema('app')
                .where('offender_manager_id', offenderManagerId)
                .andWhere('team_id', teamId)
                .first('workload_owner.id')
                .then(function (results) {
                  if (results !== undefined) {
                    return results.id
                  }
                })
            }
          })
      }
    })
}

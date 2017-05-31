const config = require('../../../config')
const knexConfig = require('../../../knexfile').development
const knex = require('knex')(knexConfig)
const teamTable = `${config.DB_APP_SCHEMA}.team`

module.exports = function (team) {
  var teamId
  knex.select().from(teamTable)
    .where('team_code', team.teamCode)
    .first()
    .then(function (result) {
      if (result === 'undefined') {
        knex(teamTable)
          .insert(team)
          .returning('id')
          .then(function (id) {
            teamId = id
          })
      } else {
        teamId = result['id']
      }
      return teamId
  })
}

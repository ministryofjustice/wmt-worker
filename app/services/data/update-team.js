const knex = require('../../../knex').appSchema
const teamTable = 'team'

module.exports = function (team) {
  return knex(teamTable)
    .withSchema('app')
    .update('description', team.description)
    .update('ldu_id', team.ldu_id)
    .where({ code: team.code })
    .returning('id').then(function (results) {
      return results.map((result) => result.id)
    })
}

const knexConfig = require('../../../knexfile').app
const knex = require('knex')(knexConfig)

module.exports = function (offenderManagerId, teamId) {
  return knex('workload_owner')
    .where('offender_manager_id', offenderManagerId)
    .andWhere('team_id', teamId)
    .first('id')
    .then(function (results) {
      return results
    })
}

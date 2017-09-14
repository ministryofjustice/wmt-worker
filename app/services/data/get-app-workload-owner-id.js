const knexConfig = require('../../../knexfile').app
const knex = require('knex')(knexConfig)

module.exports = function (offenderManagerId, teamId) {
  return knex('workload_owner')
    .where('offender_manager_id', offenderManagerId)
    .andWhere('teamId', teamId)
    .first('id')
    .then(function (results) {
      return results[0]
    })
}

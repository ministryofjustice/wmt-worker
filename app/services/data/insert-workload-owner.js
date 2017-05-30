const config = require('../../../config')
const knexConfig = require('../../../knexfile').development
const knex = require('knex')(knexConfig)
const workloadOwnerTable = `${config.DB_STG_SCHEMA}.offender_manager`

module.exports = function (workloadOwner) {
  var workloadOwnerId

  knex.select().from(workloadOwnerTable)
    .where('offender_manager_id', workloadOwner.offenderManagerId)
    .andWhere('team_id', workloadOwner.teamId)
    .first()
    .then(function (result) {
      if (result === 'undefined') {
        workloadOwnerId = knex(workloadOwnerTable)
          .insert(workloadOwner)
          .returning('id')
      }
      return workloadOwnerId
    })
}

const config = require('../../../config')
const knex = require('../../../knex').appSchema
const workloadOwnerTable = `${config.DB_APP_SCHEMA}.workload_owner`

module.exports = function (workloadOwner) {
  var workloadOwnerId

  var workloadOwnerDatabaseObject = {}
  workloadOwnerDatabaseObject.offender_manager_id = workloadOwner.offenderManagerId
  workloadOwnerDatabaseObject.contracted_hours = workloadOwner.contractedHours
  workloadOwnerDatabaseObject.team_id = workloadOwner.teamId

  return knex(workloadOwnerTable)
    .where('offender_manager_id', workloadOwner.offenderManagerId)
    .andWhere('team_id', workloadOwner.teamId)
    .first()
    .then(function (result) {
      if (result === undefined) {
        return knex(workloadOwnerTable)
          .insert(workloadOwnerDatabaseObject)
          .returning('id')
      } else {
        workloadOwnerId = result['id']
      }
      return workloadOwnerId
    })
}

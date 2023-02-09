const knex = require('../../../knex').appSchema
const workloadOwnerTable = 'workload_owner'

module.exports = function (workloadOwner) {
  const workloadOwnerDatabaseObject = {}
  workloadOwnerDatabaseObject.offender_manager_id = workloadOwner.offenderManagerId
  workloadOwnerDatabaseObject.contracted_hours = workloadOwner.contractedHours
  workloadOwnerDatabaseObject.team_id = workloadOwner.teamId

  return knex(workloadOwnerTable)
    .withSchema('app')
    .where('offender_manager_id', workloadOwner.offenderManagerId)
    .andWhere('team_id', workloadOwner.teamId)
    .first()
    .then(function (result) {
      if (result === undefined) {
        return knex(workloadOwnerTable)
          .withSchema('app')
          .insert(workloadOwnerDatabaseObject)
          .returning('id').then(function ([id]) {
            return { id: id.id, type: 'CREATE' }
          })
      } else {
        return { id: result.id, type: 'RETRIEVE' }
      }
    })
}

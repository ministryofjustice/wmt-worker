const knex = require('../../../knex').appSchema
const offenderManagerTable = 'offender_manager'

module.exports = function (offenderManager) {
  return knex(offenderManagerTable)
    .withSchema('app')
    .update('type_id', offenderManager.type_id)
    .update('forename', offenderManager.forename)
    .update('surname', offenderManager.surname)
    .where({ key: offenderManager.key })
    .returning('id').then(function (results) {
      return results.map((result) => result.id)
    })
}

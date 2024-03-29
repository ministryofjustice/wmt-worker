const knex = require('../../../knex').appSchema
const offenderManagerTable = 'offender_manager'
const updateOffenderManager = require('./update-offender-manager')

module.exports = function (offenderManager) {
  let offenderManagerId

  const offenderManagerDbObject = {}
  offenderManagerDbObject.key = offenderManager.key
  offenderManagerDbObject.forename = offenderManager.forename
  offenderManagerDbObject.surname = offenderManager.surname
  offenderManagerDbObject.type_id = offenderManager.typeId

  return knex(offenderManagerTable).withSchema('app')
    .where({ key: offenderManagerDbObject.key })
    .first()
    .then(function (result) {
      if (result === undefined) {
        return knex(offenderManagerTable)
          .withSchema('app')
          .insert(offenderManagerDbObject)
          .returning('id')
          .then(function (results) {
            return results.map((result) => result.id)
          })
      } else {
        // check if staff grade, forename or surname is still the same
        // if any of them aren't, update all
        if (result.type_id !== offenderManagerDbObject.type_id || result.forename !== offenderManagerDbObject.forename || result.surname !== offenderManagerDbObject.surname) {
          return updateOffenderManager(offenderManagerDbObject)
            .then(function (id) {
              return id
            })
        }
        offenderManagerId = result.id
      }
      return offenderManagerId
    })
}

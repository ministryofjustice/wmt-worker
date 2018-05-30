const config = require('../../../config')
const knex = require('../../../knex').appSchema
const offenderManagerTable = `${config.DB_APP_SCHEMA}.offender_manager`
const updateOffenderManager = require('./update-offender-manager')

module.exports = function (offenderManager) {
  var offenderManagerId

  var offenderManagerDbObject = {}
  offenderManagerDbObject.key = offenderManager.key
  offenderManagerDbObject.forename = offenderManager.forename
  offenderManagerDbObject.surname = offenderManager.surname
  offenderManagerDbObject.type_id = offenderManager.typeId

  return knex(offenderManagerTable)
    .where({'key': offenderManagerDbObject.key})
    .first()
    .then(function (result) {
      if (result === undefined) {
        return knex(offenderManagerTable)
          .insert(offenderManagerDbObject)
          .returning('id')
          .then(function (id) {
            return id
          })
      } else {
        // check if staff grade, forename or surname is still the same
        // if any of them aren't, update all
        if (result['type_id'] !== offenderManagerDbObject.type_id || result['forename'] !== offenderManagerDbObject.forename || result['surname'] !== offenderManagerDbObject.surname) {
          return updateOffenderManager(offenderManagerDbObject)
            .then(function (id) {
              return id
            })
        }
        offenderManagerId = result['id']
      }
      return offenderManagerId
    })
}

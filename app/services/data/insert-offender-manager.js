const config = require('../../../config')
const knex = require('../../../knex').appSchema
const offenderManagerTable = `${config.DB_APP_SCHEMA}.offender_manager`

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
        // check if staff grade is still the same
        // and update where necessary
        if (result['type_id'] !== offenderManagerDbObject.type_id) {
          return knex(offenderManagerTable)
            .update('type_id', offenderManagerDbObject.type_id)
            .where({'key': offenderManagerDbObject.key})
            .returning('id')
            .then(function (id) {
              return id
            })
        }
        offenderManagerId = result['id']
      }
      return offenderManagerId
    })
}

const config = require('../../../config')
const knexConfig = require('../../../knexfile').app
const knex = require('knex')(knexConfig)
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
        offenderManagerId = result['id']
      }
      return offenderManagerId
    })
}

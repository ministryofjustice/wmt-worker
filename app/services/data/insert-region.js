const config = require('../../../config')
const knexConfig = require('../../../knexfile').app
const knex = require('knex')(knexConfig)
const regionTable = `${config.DB_APP_SCHEMA}.region`

module.exports = function (region) {
  var regionDbObject = {}
  var regionId

  regionDbObject.code = region.code
  regionDbObject.description = region.description

  return knex.select().from(regionTable)
    .where('code', regionDbObject.code)
    .first()
    .then(function (result) {
      if (result === undefined) {
        return knex(regionTable)
          .insert(regionDbObject)
          .returning('id')
      } else {
        regionId = result['id']
      }
      return regionId
    })
}

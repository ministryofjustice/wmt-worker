const config = require('../../../config')
const knexConfig = require('../../../knexfile').development
const knex = require('knex')(knexConfig)
const regionTable = `${config.DB_APP_SCHEMA}.region`

module.exports = function (region) {
  var regionId
  knex.select().from(regionTable)
    .where('region_code', region.regionCode)
    .first()
    .then(function (result) {
      if (result === 'undefined') {
        knex(regionTable)
          .insert(region)
          .returning('id')
          .then(function (id) {
            regionId = id
          })
      } else {
        regionId = result['id']
      }
      return regionId
    })
}

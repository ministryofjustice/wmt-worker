const knex = require('../../../knex').appSchema
const regionTable = 'region'
const updateRegion = require('./update-region')

module.exports = function (region) {
  const regionDbObject = {}
  let regionId

  regionDbObject.code = region.code
  regionDbObject.description = region.description

  return knex.select().from(regionTable).withSchema('app')
    .where('code', regionDbObject.code)
    .first()
    .then(function (result) {
      if (result === undefined) {
        return knex(regionTable)
          .withSchema('app')
          .insert(regionDbObject)
          .returning('id')
      } else {
        // check if region name is still the same
        // if it isn't, update
        if (result.description !== regionDbObject.description) {
          return updateRegion(regionDbObject)
            .then(function (id) {
              return id
            })
        }
        regionId = result.id
      }
      return regionId
    })
}

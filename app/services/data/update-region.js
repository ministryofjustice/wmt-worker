const knex = require('../../../knex').appSchema
const regionTable = 'region'

module.exports = function (region) {
  return knex(regionTable)
    .withSchema('app')
    .update('description', region.description)
    .where({ code: region.code })
    .returning('id').then(function (results) {
      return results.map((result) => result.id)
    })
}

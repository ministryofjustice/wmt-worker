const knex = require('../../../knex').stagingSchema

const inserts = []

module.exports.insertDependencies = function (cmsRecords) {
  return knex('cms')
    .withSchema('staging')
    .insert(cmsRecords)
    .returning('id')
    .then(function (id) {
      inserts.push({ table: 'cms', id: id[0] })
      return inserts
    })
}

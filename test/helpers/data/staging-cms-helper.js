const knex = require('../../../knex').stagingSchema
const Promise = require('bluebird').Promise

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

module.exports.removeDependencies = function (inserts) {
  inserts = inserts.reverse()
  return Promise.each(inserts, function (insert) {
    return knex(insert.table).withSchema('staging').where('id', insert.id).del()
  })
}

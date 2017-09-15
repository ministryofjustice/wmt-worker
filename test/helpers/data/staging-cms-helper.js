const knexConfig = require('../../../knexfile').staging
const knex = require('knex')(knexConfig)
var Promise = require('bluebird').Promise

var inserts = []

module.exports.insertDependencies = function (cmsRecords) {
  return knex('cms')
    .insert(cmsRecords)
    .returning('id')
    .then(function (id) {
      inserts.push({table: 'cms', id: id})
      return inserts
    })
}

module.exports.removeDependencies = function (inserts) {
  inserts = inserts.reverse()
  return Promise.each(inserts, function (insert) {
    return knex(insert.table).where('id', insert.id).del()
  })
}

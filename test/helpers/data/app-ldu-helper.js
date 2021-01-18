const knex = require('../../../knex').appSchema
const Promise = require('bluebird').Promise

module.exports.addDependenciesForLdu = function () {
  const inserts = []

  const promise = knex('region').returning('id').insert({})
    .then(function (ids) {
      inserts.push({ table: 'region', id: ids[0] })
      return inserts
    })

  return promise
}

module.exports.removeDependenciesForLdu = function (inserts) {
  inserts = inserts.reverse()
  return Promise.each(inserts, (insert) => {
    return knex(insert.table).where('id', insert.id).del()
  })
}

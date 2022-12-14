const knex = require('../../../knex').appSchema

module.exports.addDependenciesForLdu = function () {
  const inserts = []

  const promise = knex('region').withSchema('app').returning('id').insert({})
    .then(function (ids) {
      inserts.push({ table: 'region', id: ids[0] })
      return inserts
    })

  return promise
}

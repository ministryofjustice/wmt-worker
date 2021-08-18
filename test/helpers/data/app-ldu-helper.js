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

module.exports.removeDependenciesForLdu = function (inserts) {
  inserts = inserts.reverse()
  return inserts.map((deletion) => {
    return knex(deletion.table).withSchema('app').whereIn('id', [deletion.id]).del()
  }).reduce(function(prev, current){
    return prev.then(function() {
      return current
    })
  }, Promise.resolve())
}

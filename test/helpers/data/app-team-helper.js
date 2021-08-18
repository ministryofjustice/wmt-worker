const knex = require('../../../knex').appSchema
const lduHelper = require('./app-ldu-helper')

module.exports.addDependenciesForTeam = function () {
  let inserts = []

  const promise = lduHelper.addDependenciesForLdu()
    .then(function (idsArray) {
      inserts = idsArray
      const regionId = inserts.filter((item) => item.table === 'region')[0].id
      return knex('ldu').withSchema('app').returning('id').insert({ region_id: regionId })
    }).then(function (ids) {
      inserts.push({ table: 'ldu', id: ids[0] })
      return inserts
    })

  return promise
}

module.exports.removeDependenciesForTeam = function (inserts) {
  inserts = inserts.reverse()
  return inserts.map((deletion) => {
    return knex(deletion.table).withSchema('app').whereIn('id', [deletion.id]).del()
  }).reduce(function(prev, current){
    return prev.then(function() {
      return current
    })
  }, Promise.resolve())
}

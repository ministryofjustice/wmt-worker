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

module.exports.removeDependencies = function (inserts) {
  inserts = inserts.reverse()
  return inserts.map((deletion) => {
    return knex(deletion.table).withSchema('staging').whereIn('id', [deletion.id]).del()
  }).reduce(function(prev, current){
    return prev.then(function() {
      return current
    })
  }, Promise.resolve())
}

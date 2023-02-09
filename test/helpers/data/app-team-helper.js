const knex = require('../../../knex').appSchema
const lduHelper = require('./app-ldu-helper')

module.exports.addDependenciesForTeam = function () {
  let inserts = []

  const promise = lduHelper.addDependenciesForLdu()
    .then(function (idsArray) {
      inserts = idsArray
      const regionId = inserts.filter((item) => item.table === 'region')[0].id
      return knex('ldu').withSchema('app').returning('id').insert({ region_id: regionId })
    }).then(function ([ids]) {
      inserts.push({ table: 'ldu', id: ids.id })
      return inserts
    })

  return promise
}

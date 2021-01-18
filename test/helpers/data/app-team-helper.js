const knex = require('../../../knex').appSchema
const lduHelper = require('./app-ldu-helper')
const Promise = require('bluebird').Promise

module.exports.addDependenciesForTeam = function () {
  let inserts = []

  const promise = lduHelper.addDependenciesForLdu()
    .then(function (idsArray) {
      inserts = idsArray
      const regionId = inserts.filter((item) => item.table === 'region')[0].id
      return knex('ldu').returning('id').insert({ region_id: regionId })
    }).then(function (ids) {
      inserts.push({ table: 'ldu', id: ids[0] })
      return inserts
    })

  return promise
}

module.exports.removeDependenciesForTeam = function (inserts) {
  inserts = inserts.reverse()
  return Promise.each(inserts, (insert) => {
    return knex(insert.table).where('id', insert.id).del()
  })
}

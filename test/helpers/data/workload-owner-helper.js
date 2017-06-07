const knexConfig = require('../../../knexfile').app
const knex = require('knex')(knexConfig)
const teamHelper = require('./team-helper')
var Promise = require('bluebird').Promise

module.exports.addDepenedenciesForWorkloadOwner = function () {
  var inserts = []

  var promise = knex('offender_manager_type').returning('id').insert    ({description: 'test'})
    .then(function (ids) {
      inserts.push({ table: 'offender_manager_type', id: ids[0] })
      return knex('offender_manager').returning('id').insert({type_id: ids[0]})
    })
    .then(function (ids) {
      inserts.push({ table: 'offender_manager', id: ids[0] })
      return teamHelper.addDependenciesForTeam()
    })
    .then(function (idsArray) {
      inserts = inserts.concat(idsArray)
      var lduId = inserts.filter((item) => item.table === 'ldu')[0].id
      return knex('team').returning('id').insert({ldu_id: lduId})
    })
    .then(function (ids) {
      inserts.push({table: 'team', id: ids[0]})
      return inserts
    })

    return promise
}

module.exports.removeDependenciesForWorkloadOwner = function (inserts) {
  inserts = inserts.reverse()
  return Promise.each(inserts, (insert) => {
    return knex(insert.table).where('id', insert.id).del()
  })
}
const knex = require('../../../knex').appSchema
const teamHelper = require('./app-team-helper')

module.exports.addDepenedenciesForWorkloadOwner = function () {
  let inserts = []

  const promise = knex('offender_manager_type').withSchema('app').returning('id').insert({ description: 'test' })
    .then(function (ids) {
      inserts.push({ table: 'offender_manager_type', id: ids[0] })
      return knex('offender_manager').withSchema('app').returning('id').insert({ type_id: ids[0] })
    })
    .then(function (ids) {
      inserts.push({ table: 'offender_manager', id: ids[0] })
      return teamHelper.addDependenciesForTeam()
    })
    .then(function (idsArray) {
      inserts = inserts.concat(idsArray)
      const lduId = inserts.filter((item) => item.table === 'ldu')[0].id
      return knex('team').withSchema('app').returning('id').insert({ ldu_id: lduId })
    })
    .then(function (ids) {
      inserts.push({ table: 'team', id: ids[0] })
      return inserts
    })

  return promise
}

module.exports.removeDependenciesForWorkloadOwner = function (inserts) {
  inserts = inserts.reverse()
  return inserts.map((deletion) => {
    return knex(deletion.table).withSchema('app').whereIn('id', [deletion.id]).del()
  }).reduce(function (prev, current) {
    return prev.then(function () {
      return current
    })
  }, Promise.resolve())
}

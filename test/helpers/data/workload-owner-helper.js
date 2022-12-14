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

module.exports.addWorkloadOwnerToExistingLdu = function (inserts) {
  const lduId = inserts.filter((item) => item.table === 'ldu')[0].id
  return knex('team').withSchema('app').returning('id').insert({ ldu_id: lduId })
    .then(function ([id]) {
      inserts.push({ table: 'team', id })
      const offenderManagerId = inserts.filter((item) => item.table === 'offender_manager')[0].id
      return knex('workload_owner').withSchema('app').returning('id').insert({ offender_manager_id: offenderManagerId, contracted_hours: 37, team_id: id })
        .then(function ([id]) {
          inserts.push({ table: 'workload_owner', id })
        })
    })
}

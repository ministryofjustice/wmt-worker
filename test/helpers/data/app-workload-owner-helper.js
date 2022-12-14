const knex = require('../../../knex').appSchema

module.exports.insertDependencies = function (inserts) {
  const promise = knex('offender_manager_type').withSchema('app').returning('id').insert({ description: 'test' })
    .then(function (ids) {
      inserts.push({ table: 'offender_manager_type', id: ids[0] })
      return knex('offender_manager').withSchema('app').returning(['id', 'key']).insert({ type_id: ids[0], key: ids[0] + 'abc' })
    })
    .then(function ([offenderManager]) {
      inserts.push({ table: 'offender_manager', id: offenderManager.id, offender_manager_code: offenderManager.key })
      return knex('region').withSchema('app').returning('id').insert({})
    })
    .then(function (ids) {
      inserts.push({ table: 'region', id: ids[0] })
      return knex('ldu').withSchema('app').returning('id').insert({ region_id: ids[0], description: 'Test Ldu 4', code: ids[0] + 'LDU' })
    })
    .then(function (ids) {
      inserts.push({ table: 'ldu', id: ids[0] })
      return knex('team').withSchema('app').returning(['id', 'code']).insert({ ldu_id: ids[0], code: ids[0] + '123' })
    })
    .then(function ([team]) {
      inserts.push({ table: 'team', id: team.id, teamCode: team.code })
      return knex('workload_owner').withSchema('app').returning('id')
        .insert({
          team_id: team.id,
          offender_manager_id: inserts.filter((item) => item.table === 'offender_manager')[0].id,
          contracted_hours: 40
        })
    })
    .then(function (ids) {
      inserts.push({ table: 'workload_owner', id: ids[0] })
      return knex('workload_owner').withSchema('app').returning('id')
        .insert({
          team_id: inserts.filter((item) => item.table === 'team')[0].id,
          offender_manager_id: inserts.filter((item) => item.table === 'offender_manager')[0].id,
          contracted_hours: null
        })
    })
    .then(function (ids) {
      inserts.push({ table: 'workload_owner', id: ids[0] })
      return inserts
    })

  return promise
}

module.exports.addNewTeamWorkloadOwnerForExistingOffenderManager = function (lduId, offenderManagerId) {
  const inserts = []
  const teamCode = lduId + '456'
  return knex('team').withSchema('app').returning('id').insert({ ldu_id: lduId, code: teamCode })
    .then(function ([id]) {
      inserts.push({ table: 'team', id, teamCode })
      return knex('workload_owner').withSchema('app').returning('id')
        .insert({
          team_id: id,
          offender_manager_id: offenderManagerId,
          contracted_hours: 35
        })
    }).then(function ([id]) {
      inserts.push({ table: 'workload_owner', id })
      return inserts
    })
}

module.exports.getWorkloadOwnerById = function (workloadOwnerId) {
  return knex('workload_owner').withSchema('app').where('id', workloadOwnerId)
}

module.exports.addDuplicateWorkloadOwner = function (inserts) {
  const results = []
  return knex('workload_owner').withSchema('app').returning('id')
    .insert({
      team_id: inserts.filter((item) => item.table === 'team')[0].id,
      offender_manager_id: inserts.filter((item) => item.table === 'offender_manager')[0].id,
      contracted_hours: null
    })
    .then(function (ids) {
      results.push({ table: 'workload_owner', id: ids[0] })
      return results
    })
}

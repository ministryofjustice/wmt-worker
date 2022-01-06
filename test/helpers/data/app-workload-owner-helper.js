const knex = require('../../../knex').appSchema

module.exports.insertDependencies = function (inserts) {
  const promise = knex('offender_manager_type').withSchema('app').returning('id').insert({ description: 'test' })
    .then(function (ids) {
      inserts.push({ table: 'offender_manager_type', id: ids[0] })
      return knex('offender_manager').withSchema('app').returning('id').insert({ type_id: ids[0], key: ids[0] + 'abc' })
    })
    .then(function (ids) {
      inserts.push({ table: 'offender_manager', id: ids[0] })
      return knex('region').withSchema('app').returning('id').insert({})
    })
    .then(function (ids) {
      inserts.push({ table: 'region', id: ids[0] })
      return knex('ldu').withSchema('app').returning('id').insert({ region_id: ids[0], description: 'Test Ldu 4' })
    })
    .then(function (ids) {
      inserts.push({ table: 'ldu', id: ids[0] })
      return knex('team').withSchema('app').returning('id').insert({ ldu_id: ids[0], code: ids[0] + '123' })
    })
    .then(function (ids) {
      inserts.push({ table: 'team', id: ids[0] })
      return knex('workload_owner').withSchema('app').returning('id')
        .insert({
          team_id: inserts.filter((item) => item.table === 'team')[0].id,
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
    }).catch((error) => {
      console.error(error)
      exports.removeDependencies(inserts)
    })

  return promise
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

module.exports.removeDependencies = function (inserts) {
  inserts = inserts.reverse()
  return inserts.map((deletion) => {
    return knex(deletion.table).withSchema('app').whereIn('id', [deletion.id]).del()
  }).reduce(function (prev, current) {
    return prev.then(function () {
      return current
    })
  }, Promise.resolve())
}

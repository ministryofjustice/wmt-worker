const knex = require('../../../knex').appSchema
const Promise = require('bluebird').Promise

module.exports.insertDependencies = function (inserts) {
  const promise = knex('offender_manager_type').returning('id').insert({ description: 'test' })
    .then(function (ids) {
      inserts.push({ table: 'offender_manager_type', id: ids[0] })
      return knex('offender_manager').returning('id').insert({ type_id: ids[0], key: ids[0] + 'abc' })
    })
    .then(function (ids) {
      inserts.push({ table: 'offender_manager', id: ids[0] })
      return knex('region').returning('id').insert({})
    })
    .then(function (ids) {
      inserts.push({ table: 'region', id: ids[0] })
      return knex('ldu').returning('id').insert({ region_id: ids[0] })
    })
    .then(function (ids) {
      inserts.push({ table: 'ldu', id: ids[0] })
      return knex('team').returning('id').insert({ ldu_id: ids[0], code: ids[0] + '123' })
    })
    .then(function (ids) {
      inserts.push({ table: 'team', id: ids[0] })
      return knex('workload_owner').returning('id')
        .insert({
          team_id: inserts.filter((item) => item.table === 'team')[0].id,
          offender_manager_id: inserts.filter((item) => item.table === 'offender_manager')[0].id,
          contracted_hours: 40
        })
    })
    .then(function (ids) {
      inserts.push({ table: 'workload_owner', id: ids[0] })
      return knex('workload_owner').returning('id')
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

module.exports.removeDependencies = function (inserts) {
  inserts = inserts.reverse()
  return Promise.each(inserts, (insert) => {
    return knex(insert.table).where('id', insert.id).del()
  })
}

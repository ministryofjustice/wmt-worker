const knexConfig = require('../../../knexfile').app
const knex = require('knex')(knexConfig)
const Locations = require('wmt-probation-rules').Locations
var Promise = require('bluebird').Promise

module.exports.insertDependencies = function (inserts) {
  var promise = knex('offender_manager_type').returning('id').insert({description: 'test'})
    .then(function (ids) {
      inserts.push({ table: 'offender_manager_type', id: ids[0] })
      return knex('offender_manager').returning('id').insert({type_id: ids[0]})
    })
    .then(function (ids) {
      inserts.push({ table: 'offender_manager', id: ids[0] })
      return knex('region').returning('id').insert({})
    })
    .then(function (ids) {
      inserts.push({ table: 'region', id: ids[0] })
      return knex('ldu').returning('id').insert({region_id: ids[0]})
    })
    .then(function (ids) {
      inserts.push({ table: 'ldu', id: ids[0] })
      return knex('team').returning('id').insert({ldu_id: ids[0]})
    })
    .then(function (ids) {
      inserts.push({table: 'team', id: ids[0]})
      return knex('workload_owner').returning('id')
        .insert({team_id: inserts.filter((item) => item.table === 'team')[0].id,
          offender_manager_id: inserts.filter((item) => item.table === 'offender_manager')[0].id})
    })
    .then(function (ids) {
      inserts.push({table: 'workload_owner', id: ids[0]})

      var defaultWorkload = {
        workload_owner_id: ids[0],
        total_cases: 8,
        total_custody_cases: 1,
        total_community_cases: 2,
        total_license_cases: 3,
        monthly_sdrs: 4,
        sdr_due_next_30_days: 5,
        sdr_conversions_last_30_days: 6,
        paroms_completed_last_30_days: 7,
        paroms_due_next_30_days: 8,
        license_last_16_weeks: 9,
        community_last_16_weeks: 10
      }

      var workloads = [
        Object.assign({}, defaultWorkload, {total_cases: 20}),
        Object.assign({}, defaultWorkload, {total_cases: 30})
      ]

      return knex('workload').returning('id').insert(workloads)
    })
    .then(function (ids) {
      var locations = [Locations.COMMUNITY, Locations.CUSTODY, Locations.LICENSE]
      var cases = []
      ids.forEach((id) => {
        inserts.push({table: 'workload', id: id})
        for (var i = 0; i < 3; i++) {
          for (var j = 0; j < 8; j++) {
            cases.push({
              workload_id: id,
              tier_number: j,
              overdue_terminations_total: 1,
              warrants_total: 1,
              unpaid_work_total: 1,
              total_cases: 10,
              location: locations[i]
            })
          }
        }
      })
      return knex('tiers').returning('id').insert(cases)
    })
    .then(function (ids) {
      ids.forEach((id) => {
        inserts.push({table: 'tiers', id: id})
      })
      return inserts
    }).catch((error) => {
      console.error(error)
      exports.removeDependencies(inserts)
    })

  return promise
}

module.exports.removeDependencies = function (inserts) {
  inserts = inserts.reverse()
  var groupedDeletions = [{table: inserts[0].table, id: [inserts[0].id]}]

  for (var i = 1; i < inserts.length; i++) {
    if (inserts[i].table === groupedDeletions[groupedDeletions.length - 1].table) {
      groupedDeletions[groupedDeletions.length - 1].id.push(inserts[i].id)
    } else {
      groupedDeletions.push({table: inserts[i].table, id: [inserts[i].id]})
    }
  }

  return Promise.each(groupedDeletions, (deletion) => {
    return knex(deletion.table).whereIn('id', deletion.id).del()
  })
}

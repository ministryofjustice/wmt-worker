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
      return knex('working_hours').returning('id').insert({})
    })
    .then(function (ids) {
      inserts.push({table: 'working_hours', id: ids[0]})
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
        paroms_due_next_30_days: 8
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
      return knex('workload_report').returning('id').insert({})
    })
    .then(function (ids) {
      inserts.push({table: 'workload_report', id: ids[0]})
      return knex('workload_points').returning('id').insert({
        comm_tier_1: 1,
        comm_tier_2: 2,
        comm_tier_3: 3,
        comm_tier_4: 4,
        comm_tier_5: 5,
        comm_tier_6: 6,
        comm_tier_7: 7,
        cust_tier_1: 8,
        cust_tier_2: 9,
        cust_tier_3: 10,
        cust_tier_4: 11,
        cust_tier_5: 12,
        cust_tier_6: 13,
        cust_tier_7: 14,
        lic_tier_1: 15,
        lic_tier_2: 16,
        lic_tier_3: 17,
        lic_tier_4: 18,
        lic_tier_5: 19,
        lic_tier_6: 20,
        lic_tier_7: 21,
        user_id: 0,
        sdr: 22,
        sdr_conversion: 23,
        nominal_target_spo: 24,
        nominal_target_po: 25,
        default_contracted_hours_po: 26,
        default_contracted_hours_pso: 27,
        weighting_o: 28,
        weighting_w: 29,
        weighting_u: 30,
        paroms_enabled: 1,
        parom: 31
      })
    })
    .then(function (ids) {
      inserts.push({table: 'workload_points', id: ids[0]})
      return inserts
    })

  return promise
}

module.exports.removeDependencies = function (inserts) {
  inserts = inserts.reverse()
  return Promise.each(inserts, (insert) => {
    return knex(insert.table).where('id', insert.id).del()
  })
}

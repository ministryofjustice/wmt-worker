const knexConfig = require('').integrationTests
const knex = require('knex')(knexConfig)

module.exports.addWorkloads = function () {
  var inserts = []

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
      inserts.push({table: 'workload_owner', id: ids[0]})
      return knex('workload').returning('id').insert({
        workload_owner_id: ids[0],
        total_cases: 0,
        total_cases_inactive: 0,
        monthly_sdrs: 0,
        sdr_due_next_30_days: 0,
        active_warrants: 0,
        overdue_terminations: 0,
        unpaid_work: 0,
        order_count: 0,
        paroms_completed_last_30_days: 0,
        paroms_due_next_30_days: 0,
        lic_16_week_count: 0
      })
    })
    .then(function (ids) {
      inserts.push({table: 'workload_report', id: ids[0]})
      return knex('workload_points').returning('id').insert({
        comm_tier_1: 0,
        comm_tier_2: 0,
        comm_tier_3: 0,
        comm_tier_4: 0,
        comm_tier_5: 0,
        comm_tier_6: 0,
        comm_tier_7: 0,
        cust_tier_1: 0,
        cust_tier_2: 0,
        cust_tier_3: 0,
        cust_tier_4: 0,
        cust_tier_5: 0,
        cust_tier_6: 0,
        cust_tier_7: 0,
        lic_tier_1: 0,
        lic_tier_2: 0,
        lic_tier_3: 0,
        lic_tier_4: 0,
        lic_tier_5: 0,
        lic_tier_6: 0,
        lic_tier_7: 0,
        user_id: 0,
        sdr: 0,
        sdr_conversion: 0,
        nominal_target_spo: 0,
        nominal_target_po: 0,
        default_contracted_hours_po: 0,
        default_contracted_hours_spo: 0,
        weighting_o: 0,
        weighting_w: 0,
        weighting_u: 0,
        paroms_enabled: 0,
        parom: 0
      })
    })
    .then(function (ids) {
      ids.forEach((id) => {
        inserts.push({table: 'workload_points_calculations', id: id})
      }, this)
      return inserts
    })

  return promise
}

module.exports.removeWorkloadObjects = function (inserts) {
  inserts = inserts.revers()
  return Promise.each(inserts, (insert) => {
    return knex(insert.table).where('id', insert.id).del()
  })
}

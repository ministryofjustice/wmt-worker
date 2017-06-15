var tableName = 'workload_points'

exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex(tableName).del()
    .then(function () {
      // Inserts seed entries
      return knex(tableName).insert({
        comm_tier_1: 50,
        comm_tier_2: 50,
        comm_tier_3: 50,
        comm_tier_4: 50,
        comm_tier_5: 50,
        comm_tier_6: 50,
        comm_tier_7: 50,
        cust_tier_1: 50,
        cust_tier_2: 50,
        cust_tier_3: 50,
        cust_tier_4: 50,
        cust_tier_5: 50,
        cust_tier_6: 50,
        cust_tier_7: 50,
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
        nominal_target_spo: 35,
        nominal_target_po: 35,
        default_contracted_hours_po: 35,
        default_contracted_hours_pso: 35,
        weighting_o: 0,
        weighting_w: 0,
        weighting_u: 0,
        paroms_enabled: 0,
        parom: 0
      })
    })
}

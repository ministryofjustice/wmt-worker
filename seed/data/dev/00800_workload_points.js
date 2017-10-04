var tableName = 'workload_points'

exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex(tableName).del()
    .then(function () {
      // Inserts seed entries
      return knex(tableName).insert({
        comm_tier_1: 24,
        comm_tier_2: 36,
        comm_tier_3: 45,
        comm_tier_4: 57,
        comm_tier_5: 93,
        comm_tier_6: 106,
        comm_tier_7: 150,
        cust_tier_1: 20,
        cust_tier_2: 30,
        cust_tier_3: 40,
        cust_tier_4: 50,
        cust_tier_5: 90,
        cust_tier_6: 100,
        cust_tier_7: 150,
        lic_tier_1: 20,
        lic_tier_2: 30,
        lic_tier_3: 40,
        lic_tier_4: 50,
        lic_tier_5: 90,
        lic_tier_6: 100,
        lic_tier_7: 150,
        user_id: 0,
        sdr: 132,
        sdr_conversion: 41,
        nominal_target_spo: 2176,
        nominal_target_po: 2176,
        default_contracted_hours_po: 37,
        default_contracted_hours_pso: 37,
        weighting_o: 0,
        weighting_w: 0,
        weighting_u: 100,
        weighting_arms_lic: 100,
        weighting_arms_comm: 100,
        paroms_enabled: 1,
        parom: 123
      })
    })
}

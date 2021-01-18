const tableName = 'workload_points'

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
        parom: 123,
        is_t2a: false,
        default_contracted_hours_spo: 0
      })
        .then(function () {
          return knex(tableName).insert({
            comm_tier_1: 14,
            comm_tier_2: 26,
            comm_tier_3: 35,
            comm_tier_4: 47,
            comm_tier_5: 83,
            comm_tier_6: 96,
            comm_tier_7: 140,
            cust_tier_1: 10,
            cust_tier_2: 20,
            cust_tier_3: 30,
            cust_tier_4: 40,
            cust_tier_5: 80,
            cust_tier_6: 90,
            cust_tier_7: 140,
            lic_tier_1: 10,
            lic_tier_2: 20,
            lic_tier_3: 30,
            lic_tier_4: 40,
            lic_tier_5: 80,
            lic_tier_6: 90,
            lic_tier_7: 140,
            user_id: 0,
            sdr: 0,
            sdr_conversion: 0,
            nominal_target_spo: 0,
            nominal_target_po: 0,
            default_contracted_hours_po: 0,
            default_contracted_hours_pso: 0,
            weighting_o: 0,
            weighting_w: 0,
            weighting_u: 90,
            weighting_arms_lic: 0,
            weighting_arms_comm: 0,
            paroms_enabled: 0,
            parom: 0,
            is_t2a: true,
            default_contracted_hours_spo: 0
          })
        })
    })
}

var tableName = 'workload'

exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex(tableName).del()
    .then(function () {
      return knex('workload_owner').select('id').first()
    })
    .then(function (randomWorkloadOwnerId) {
      // Inserts seed entries
      return knex(tableName).insert([
        { workload_owner_id: randomWorkloadOwnerId.id, total_cases: 15, monthly_sdrs: 10, sdr_due_next_30_days: 10, sdr_conversions_last_30_days: 10, total_community_cases: 5, total_custody_cases: 10, total_license_cases: 3, paroms_completed_last_30_days: 5, paroms_due_next_30_days: 5, license_last_16_weeks: 9, community_last_16_weeks: 10 },
        { workload_owner_id: randomWorkloadOwnerId.id, total_cases: 15, monthly_sdrs: 10, sdr_due_next_30_days: 10, sdr_conversions_last_30_days: 10, total_community_cases: 5, total_custody_cases: 10, total_license_cases: 3, paroms_completed_last_30_days: 5, paroms_due_next_30_days: 5, license_last_16_weeks: 9, community_last_16_weeks: 10 },
        { workload_owner_id: randomWorkloadOwnerId.id, total_cases: 15, monthly_sdrs: 10, sdr_due_next_30_days: 10, sdr_conversions_last_30_days: 10, total_community_cases: 5, total_custody_cases: 10, total_license_cases: 3, paroms_completed_last_30_days: 5, paroms_due_next_30_days: 5, license_last_16_weeks: 9, community_last_16_weeks: 10 },
        { workload_owner_id: randomWorkloadOwnerId.id, total_cases: 15, monthly_sdrs: 10, sdr_due_next_30_days: 10, sdr_conversions_last_30_days: 10, total_community_cases: 5, total_custody_cases: 10, total_license_cases: 3, paroms_completed_last_30_days: 5, paroms_due_next_30_days: 5, license_last_16_weeks: 9, community_last_16_weeks: 10 },
        { workload_owner_id: randomWorkloadOwnerId.id, total_cases: 15, monthly_sdrs: 10, sdr_due_next_30_days: 10, sdr_conversions_last_30_days: 10, total_community_cases: 5, total_custody_cases: 10, total_license_cases: 3, paroms_completed_last_30_days: 5, paroms_due_next_30_days: 5, license_last_16_weeks: 9, community_last_16_weeks: 10 },
        { workload_owner_id: randomWorkloadOwnerId.id, total_cases: 15, monthly_sdrs: 10, sdr_due_next_30_days: 10, sdr_conversions_last_30_days: 10, total_community_cases: 5, total_custody_cases: 10, total_license_cases: 3, paroms_completed_last_30_days: 5, paroms_due_next_30_days: 5, license_last_16_weeks: 9, community_last_16_weeks: 10 },
        { workload_owner_id: randomWorkloadOwnerId.id, total_cases: 15, monthly_sdrs: 10, sdr_due_next_30_days: 10, sdr_conversions_last_30_days: 10, total_community_cases: 5, total_custody_cases: 10, total_license_cases: 3, paroms_completed_last_30_days: 5, paroms_due_next_30_days: 5, license_last_16_weeks: 9, community_last_16_weeks: 10 },
        { workload_owner_id: randomWorkloadOwnerId.id, total_cases: 15, monthly_sdrs: 10, sdr_due_next_30_days: 10, sdr_conversions_last_30_days: 10, total_community_cases: 5, total_custody_cases: 10, total_license_cases: 3, paroms_completed_last_30_days: 5, paroms_due_next_30_days: 5, license_last_16_weeks: 9, community_last_16_weeks: 10 },
        { workload_owner_id: randomWorkloadOwnerId.id, total_cases: 15, monthly_sdrs: 10, sdr_due_next_30_days: 10, sdr_conversions_last_30_days: 10, total_community_cases: 5, total_custody_cases: 10, total_license_cases: 3, paroms_completed_last_30_days: 5, paroms_due_next_30_days: 5, license_last_16_weeks: 9, community_last_16_weeks: 10 },
        { workload_owner_id: randomWorkloadOwnerId.id, total_cases: 15, monthly_sdrs: 10, sdr_due_next_30_days: 10, sdr_conversions_last_30_days: 10, total_community_cases: 5, total_custody_cases: 10, total_license_cases: 3, paroms_completed_last_30_days: 5, paroms_due_next_30_days: 5, license_last_16_weeks: 9, community_last_16_weeks: 10 },
        { workload_owner_id: randomWorkloadOwnerId.id, total_cases: 15, monthly_sdrs: 10, sdr_due_next_30_days: 10, sdr_conversions_last_30_days: 10, total_community_cases: 5, total_custody_cases: 10, total_license_cases: 3, paroms_completed_last_30_days: 5, paroms_due_next_30_days: 5, license_last_16_weeks: 9, community_last_16_weeks: 10 },
        { workload_owner_id: randomWorkloadOwnerId.id, total_cases: 15, monthly_sdrs: 10, sdr_due_next_30_days: 10, sdr_conversions_last_30_days: 10, total_community_cases: 5, total_custody_cases: 10, total_license_cases: 3, paroms_completed_last_30_days: 5, paroms_due_next_30_days: 5, license_last_16_weeks: 9, community_last_16_weeks: 10 },
        { workload_owner_id: randomWorkloadOwnerId.id, total_cases: 15, monthly_sdrs: 10, sdr_due_next_30_days: 10, sdr_conversions_last_30_days: 10, total_community_cases: 5, total_custody_cases: 10, total_license_cases: 3, paroms_completed_last_30_days: 5, paroms_due_next_30_days: 5, license_last_16_weeks: 9, community_last_16_weeks: 10 }
      ])
    })
}

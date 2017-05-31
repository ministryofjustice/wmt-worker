var tableName = 'workload'

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex(tableName).del()
    .then(function () {
          return knex('workload_owner').select('id').first()
      })
    .then(function (randomWorkloadOwnerId) {
      // Inserts seed entries
      return knex(tableName).insert([
        { workload_owner_id: randomWorkloadOwnerId.id, total_cases: 15, total_cases_inactive: 1, monthly_sdrs: 10, sdr_due_next_30_days: 10, active_warrants: 5, overdue_terminations: 10, unpaid_work: 3, order_count: 5, paroms_completed_last_30_days: 5, paroms_due_next_30_days: 5, lic_16_week_count: 5 },
        { workload_owner_id: randomWorkloadOwnerId.id, total_cases: 15, total_cases_inactive: 1, monthly_sdrs: 10, sdr_due_next_30_days: 10, active_warrants: 5, overdue_terminations: 10, unpaid_work: 3, order_count: 5, paroms_completed_last_30_days: 5, paroms_due_next_30_days: 5, lic_16_week_count: 5 },
        { workload_owner_id: randomWorkloadOwnerId.id, total_cases: 15, total_cases_inactive: 1, monthly_sdrs: 10, sdr_due_next_30_days: 10, active_warrants: 5, overdue_terminations: 10, unpaid_work: 3, order_count: 5, paroms_completed_last_30_days: 5, paroms_due_next_30_days: 5, lic_16_week_count: 5 },
        { workload_owner_id: randomWorkloadOwnerId.id, total_cases: 15, total_cases_inactive: 1, monthly_sdrs: 10, sdr_due_next_30_days: 10, active_warrants: 5, overdue_terminations: 10, unpaid_work: 3, order_count: 5, paroms_completed_last_30_days: 5, paroms_due_next_30_days: 5, lic_16_week_count: 5 },
        { workload_owner_id: randomWorkloadOwnerId.id, total_cases: 15, total_cases_inactive: 1, monthly_sdrs: 10, sdr_due_next_30_days: 10, active_warrants: 5, overdue_terminations: 10, unpaid_work: 3, order_count: 5, paroms_completed_last_30_days: 5, paroms_due_next_30_days: 5, lic_16_week_count: 5 },
        { workload_owner_id: randomWorkloadOwnerId.id, total_cases: 15, total_cases_inactive: 1, monthly_sdrs: 10, sdr_due_next_30_days: 10, active_warrants: 5, overdue_terminations: 10, unpaid_work: 3, order_count: 5, paroms_completed_last_30_days: 5, paroms_due_next_30_days: 5, lic_16_week_count: 5 },
        { workload_owner_id: randomWorkloadOwnerId.id, total_cases: 15, total_cases_inactive: 1, monthly_sdrs: 10, sdr_due_next_30_days: 10, active_warrants: 5, overdue_terminations: 10, unpaid_work: 3, order_count: 5, paroms_completed_last_30_days: 5, paroms_due_next_30_days: 5, lic_16_week_count: 5 },
        { workload_owner_id: randomWorkloadOwnerId.id, total_cases: 15, total_cases_inactive: 1, monthly_sdrs: 10, sdr_due_next_30_days: 10, active_warrants: 5, overdue_terminations: 10, unpaid_work: 3, order_count: 5, paroms_completed_last_30_days: 5, paroms_due_next_30_days: 5, lic_16_week_count: 5 },
        { workload_owner_id: randomWorkloadOwnerId.id, total_cases: 15, total_cases_inactive: 1, monthly_sdrs: 10, sdr_due_next_30_days: 10, active_warrants: 5, overdue_terminations: 10, unpaid_work: 3, order_count: 5, paroms_completed_last_30_days: 5, paroms_due_next_30_days: 5, lic_16_week_count: 5 },
        { workload_owner_id: randomWorkloadOwnerId.id, total_cases: 15, total_cases_inactive: 1, monthly_sdrs: 10, sdr_due_next_30_days: 10, active_warrants: 5, overdue_terminations: 10, unpaid_work: 3, order_count: 5, paroms_completed_last_30_days: 5, paroms_due_next_30_days: 5, lic_16_week_count: 5 },
        { workload_owner_id: randomWorkloadOwnerId.id, total_cases: 15, total_cases_inactive: 1, monthly_sdrs: 10, sdr_due_next_30_days: 10, active_warrants: 5, overdue_terminations: 10, unpaid_work: 3, order_count: 5, paroms_completed_last_30_days: 5, paroms_due_next_30_days: 5, lic_16_week_count: 5 },
        { workload_owner_id: randomWorkloadOwnerId.id, total_cases: 15, total_cases_inactive: 1, monthly_sdrs: 10, sdr_due_next_30_days: 10, active_warrants: 5, overdue_terminations: 10, unpaid_work: 3, order_count: 5, paroms_completed_last_30_days: 5, paroms_due_next_30_days: 5, lic_16_week_count: 5 },
        { workload_owner_id: randomWorkloadOwnerId.id, total_cases: 15, total_cases_inactive: 1, monthly_sdrs: 10, sdr_due_next_30_days: 10, active_warrants: 5, overdue_terminations: 10, unpaid_work: 3, order_count: 5, paroms_completed_last_30_days: 5, paroms_due_next_30_days: 5, lic_16_week_count: 5 },
      ]);
    });
};

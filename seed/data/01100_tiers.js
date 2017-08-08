var tableName = 'tiers'

exports.seed = function (knex, Promise) {
    // Deletes ALL existing entries
  return knex(tableName).del()
    .return(knex('workload').select('id').first())
    .then(function (workload) {
      return knex(tableName).insert([
        { workload_id: workload.id, tier_number: 0, overdue_terminations_total: 0, unpaid_work_total: 0, warrants_total: 0, total_cases: 0, location: 'COMMUNITY' },
        { workload_id: workload.id, tier_number: 1, overdue_terminations_total: 1, unpaid_work_total: 0, warrants_total: 0, total_cases: 1, location: 'COMMUNITY' },
        { workload_id: workload.id, tier_number: 2, overdue_terminations_total: 1, unpaid_work_total: 1, warrants_total: 0, total_cases: 2, location: 'COMMUNITY' },
        { workload_id: workload.id, tier_number: 3, overdue_terminations_total: 1, unpaid_work_total: 1, warrants_total: 1, total_cases: 3, location: 'COMMUNITY' },
        { workload_id: workload.id, tier_number: 4, overdue_terminations_total: 2, unpaid_work_total: 0, warrants_total: 0, total_cases: 2, location: 'COMMUNITY' },
        { workload_id: workload.id, tier_number: 5, overdue_terminations_total: 2, unpaid_work_total: 2, warrants_total: 0, total_cases: 4, location: 'COMMUNITY' },
        { workload_id: workload.id, tier_number: 6, overdue_terminations_total: 2, unpaid_work_total: 2, warrants_total: 2, total_cases: 6, location: 'COMMUNITY' },
        { workload_id: workload.id, tier_number: 7, overdue_terminations_total: 2, unpaid_work_total: 1, warrants_total: 0, total_cases: 3, location: 'COMMUNITY' },
        { workload_id: workload.id, tier_number: 0, overdue_terminations_total: 0, unpaid_work_total: 0, warrants_total: 0, total_cases: 0, location: 'CUSTODY' },
        { workload_id: workload.id, tier_number: 1, overdue_terminations_total: 1, unpaid_work_total: 0, warrants_total: 0, total_cases: 1, location: 'CUSTODY' },
        { workload_id: workload.id, tier_number: 2, overdue_terminations_total: 1, unpaid_work_total: 1, warrants_total: 0, total_cases: 2, location: 'CUSTODY' },
        { workload_id: workload.id, tier_number: 3, overdue_terminations_total: 1, unpaid_work_total: 1, warrants_total: 1, total_cases: 3, location: 'CUSTODY' },
        { workload_id: workload.id, tier_number: 4, overdue_terminations_total: 2, unpaid_work_total: 0, warrants_total: 0, total_cases: 2, location: 'CUSTODY' },
        { workload_id: workload.id, tier_number: 5, overdue_terminations_total: 2, unpaid_work_total: 2, warrants_total: 0, total_cases: 4, location: 'CUSTODY' },
        { workload_id: workload.id, tier_number: 6, overdue_terminations_total: 2, unpaid_work_total: 2, warrants_total: 2, total_cases: 5, location: 'CUSTODY' },
        { workload_id: workload.id, tier_number: 7, overdue_terminations_total: 2, unpaid_work_total: 1, warrants_total: 0, total_cases: 3, location: 'CUSTODY' },
        { workload_id: workload.id, tier_number: 0, overdue_terminations_total: 0, unpaid_work_total: 0, warrants_total: 0, total_cases: 0, location: 'LICENSE' },
        { workload_id: workload.id, tier_number: 1, overdue_terminations_total: 1, unpaid_work_total: 0, warrants_total: 0, total_cases: 1, location: 'LICENSE' },
        { workload_id: workload.id, tier_number: 2, overdue_terminations_total: 1, unpaid_work_total: 1, warrants_total: 0, total_cases: 2, location: 'LICENSE' },
        { workload_id: workload.id, tier_number: 3, overdue_terminations_total: 1, unpaid_work_total: 1, warrants_total: 1, total_cases: 3, location: 'LICENSE' },
        { workload_id: workload.id, tier_number: 4, overdue_terminations_total: 2, unpaid_work_total: 0, warrants_total: 0, total_cases: 2, location: 'LICENSE' },
        { workload_id: workload.id, tier_number: 5, overdue_terminations_total: 2, unpaid_work_total: 2, warrants_total: 0, total_cases: 4, location: 'LICENSE' },
        { workload_id: workload.id, tier_number: 6, overdue_terminations_total: 2, unpaid_work_total: 2, warrants_total: 2, total_cases: 6, location: 'LICENSE' },
        { workload_id: workload.id, tier_number: 7, overdue_terminations_total: 2, unpaid_work_total: 1, warrants_total: 0, total_cases: 3, location: 'LICENSE' }
      ])
    })
}

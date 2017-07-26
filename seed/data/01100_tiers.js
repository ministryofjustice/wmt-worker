var tableName = 'tiers'

exports.seed = function (knex, Promise) {
    // Deletes ALL existing entries
  return knex(tableName).del()
    .return(knex('workload').select('id').first())
    .then(function (workload) {
      return knex(tableName).insert([
        { workload_id: workload.id, tier_number: 1, overdue_terminations_total: 10, unpaid_work_total: 10, warrants_total: 10, total_cases: 10,location: 'COMMUNITY'},
        { workload_id: workload.id, tier_number: 2, overdue_terminations_total: 20, unpaid_work_total: 20, warrants_total: 20, total_cases: 20,location: 'CUSTODY'},
        { workload_id: workload.id, tier_number: 3, overdue_terminations_total: 30, unpaid_work_total: 30, warrants_total: 30, total_cases: 30,location: 'COMMUNITY'},
      ])
    })
}

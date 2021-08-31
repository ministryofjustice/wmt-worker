const tableName = 'court_reports'

const courtReportsRow = {
  workload_owner_id: 1,
  total_sdrs: 10,
  total_fdrs: 11,
  total_oral_reports: 12
}

let courtReportsToInsert

exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex(tableName).withSchema('app').del()
    .then(function () {
      return knex('workload_owner').withSchema('app').select('workload_owner.id')
        .join('team', 'team.id', 'workload_owner.team_id').where('team.description', 'CR Team 1')
    })
    .then(function (workloadOwners) {
      return knex('workload_report').withSchema('app').select('id')
        .then(function (existingWrIds) {
          for (let wr = 0; wr < existingWrIds.length; wr++) {
            courtReportsToInsert = []
            for (const workloadOwner in workloadOwners) {
              for (let i = 0; i < 5; i++) {
                courtReportsToInsert.push(Object.assign({}, courtReportsRow, { workload_owner_id: workloadOwners[workloadOwner].id, staging_id: i + 1, workload_report_id: wr }))
              }
            }
          }
          return knex(tableName).withSchema('app').insert(courtReportsToInsert)
        })
    })
}

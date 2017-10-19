var tableName = 'court_reports'

const courtReportsRow = {
  workload_owner_id: 1,
  total_sdrs: 10,
  total_fdrs: 11,
  total_oral_reports: 12
}

exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex(tableName).del()
    .then(function () {
      return knex('workload_owner').select('workload_owner.id')
      .join('team', 'team.id', 'workload_owner.team_id').where('team.description', 'CR Team 1')
    })
    .then(function (workloadOwners) {
      return knex('workload_report').select('id')
      .then(function (existingWrIds) {
        for (var wr = 0; wr < existingWrIds.length; wr++) {
          var courtReportsToInsert = []
          for (var workloadOwner in workloadOwners) {
            for (var i = 0; i < 5; i++) {
              courtReportsToInsert.push(Object.assign({}, courtReportsRow, {workload_owner_id: workloadOwners[workloadOwner].id, staging_id: i + 1, workload_report_id: wr}))
            }
          }
        }
        return knex(tableName).insert(courtReportsToInsert)
      })
    })
}

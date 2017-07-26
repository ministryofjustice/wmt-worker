var tableName = 'workload_owner'

exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  var teamIds
  return knex(tableName).del()
    .return(knex('team').select('id').limit(4))
    .then(function (results) {
      teamIds = results
      return knex('offender_manager').select('id')
        .limit(5)
    })
    .then(function (omIds) {
      // Inserts seed entries
      return Promise.each(omIds, (omId) => {
        return knex(tableName).insert([
          { offender_manager_id: omId.id, team_id: teamIds[0].id },
          { offender_manager_id: omId.id, team_id: teamIds[1].id },
          { offender_manager_id: omId.id, team_id: teamIds[2].id },
          { offender_manager_id: omId.id, team_id: teamIds[3].id }
        ])
      })
    })
}

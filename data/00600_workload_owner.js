var tableName = 'workload_owner'

exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  var teamId
  return knex(tableName).del()
    .return(knex('team').select('id').first())
    .then(function (id) {
      teamId = id
      return knex('offender_manager').select('id')
        .limit(5)
    })
    .then(function (omIds) {
      // Inserts seed entries
      return Promise.each(omIds, (omId) => {
        return knex(tableName).insert([
          { offender_manager_id: omId.id, team_id: teamId.id }
        ])
      })
    })
}

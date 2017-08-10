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
      var contractedHours = [37.5, 36.5, 35.5, 33.5, 32.5]
      var insertData = []

      var counter = 0
      omIds.forEach(function (omId) {
        var hours = contractedHours[counter++]
        insertData.push(
          { offender_manager_id: omId.id, team_id: teamIds[0].id, contractedHours: hours },
          { offender_manager_id: omId.id, team_id: teamIds[1].id, contractedHours: hours },
          { offender_manager_id: omId.id, team_id: teamIds[2].id, contractedHours: hours },
          { offender_manager_id: omId.id, team_id: teamIds[3].id, contractedHours: hours }
        )
      })
      return knex(tableName).insert(insertData)
    })
}

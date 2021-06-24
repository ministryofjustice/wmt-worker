const tableName = 'workload_owner'

exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  let teamIds
  return knex(tableName).withSchema('app').del()
    .then(function () {
      return knex('team').withSchema('app').select('id').limit(4)
    })
    .then(function (results) {
      teamIds = results
      return knex('offender_manager').withSchema('app').select('id')
        .limit(5)
    })
    .then(function (omIds) {
      // Inserts seed entries
      const contractedHours = [37, 36, 35, 33, 32]
      const insertData = []

      let counter = 0
      omIds.forEach(function (omId) {
        const hours = contractedHours[counter++]
        insertData.push(
          { offender_manager_id: omId.id, team_id: teamIds[0].id, contracted_hours: hours },
          { offender_manager_id: omId.id, team_id: teamIds[1].id, contracted_hours: hours },
          { offender_manager_id: omId.id, team_id: teamIds[2].id, contracted_hours: hours },
          { offender_manager_id: omId.id, team_id: teamIds[3].id, contracted_hours: hours }
        )
      })
      return knex(tableName).withSchema('app').insert(insertData)
        .then(function () {
          let teamId
          return knex('team').withSchema('app').first('id').where('description', 'CR Team 1')
            .then(function (result) {
              teamId = result.id
              return knex('offender_manager').withSchema('app').select('id').whereIn('key', ['CR01', 'CR02'])
                .then(function (omIds) {
                  // Inserts seed entries
                  const contractedHours = [37, 36, 35, 33, 32]
                  const insertData = []

                  let counter = 0
                  omIds.forEach(function (omId) {
                    const hours = contractedHours[counter++]
                    insertData.push(
                      { offender_manager_id: omId.id, team_id: teamId, contracted_hours: hours }
                    )
                  })
                  return knex(tableName).withSchema('app').insert(insertData)
                })
            })
        })
    })
}

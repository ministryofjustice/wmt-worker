var tableName = 'team'

exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  var lduIds
  return knex(tableName).del()
    .return(knex('ldu').select('id').limit(3))
    .then(function (results) {
      console.log('TEAM ' + results)
      var lduIds = results
      // Inserts seed entries
      return knex(tableName).insert([
        { description: 'test team 1', ldu_id: lduIds[0].id },
        { description: 'test team 2', ldu_id: lduIds[1].id },
        { description: 'test team 3', ldu_id: lduIds[2].id },
        { description: 'test team 4', ldu_id: lduIds[0].id },
        { description: 'test team 5', ldu_id: lduIds[1].id },
        { description: 'test team 6', ldu_id: lduIds[2].id }
      ])
    })
}

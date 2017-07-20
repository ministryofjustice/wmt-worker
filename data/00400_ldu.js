var tableName = 'ldu'

exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  var regionIds
  return knex(tableName).del()
    .return(knex('region').select('id').limit(3))
    .then(function (results) {
      regionIds = results
      // Inserts seed entries
      return knex(tableName).insert([
        { description: 'test ldu 1', region_id: regionIds[0].id },
        { description: 'test ldu 2', region_id: regionIds[1].id },
        { description: 'test ldu 3', region_id: regionIds[2].id },
        { description: 'test ldu 4', region_id: regionIds[0].id },
        { description: 'test ldu 5', region_id: regionIds[1].id },
        { description: 'test ldu 6', region_id: regionIds[2].id }
      ])
    })
}

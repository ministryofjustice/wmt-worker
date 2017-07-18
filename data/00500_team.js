var tableName = 'team'

exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex(tableName).del()
    .return(knex('ldu').select('id').first())
    .then(function (lduId) {
      // Inserts seed entries
      return knex(tableName).insert([
        { description: 'test team 1', ldu_id: lduId.id },
        { description: 'test team 2', ldu_id: lduId.id },
        { description: 'test team 3', ldu_id: lduId.id },
        { description: 'test team 4', ldu_id: lduId.id },
        { description: 'test team 5', ldu_id: lduId.id },
        { description: 'test team 6', ldu_id: lduId.id },
        { description: 'test team 7', ldu_id: lduId.id },
        { description: 'test team 8', ldu_id: lduId.id }
      ])
    })
}

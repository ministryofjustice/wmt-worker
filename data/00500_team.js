var tableName = 'team'

exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex(tableName).del()
    .return(knex('ldu').select('id').first())
    .then(function (lduId) {
      // Inserts seed entries
      return knex(tableName).insert([
        { description: 'test team multiple managers', ldu_id: lduId.id }
      ])
    })
}

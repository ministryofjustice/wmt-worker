const tableName = 'region'

exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex(tableName).del()
    .then(function () {
      // Inserts seed entries
      return knex(tableName).insert([
        { description: 'Division 1' },
        { description: 'Division 2' },
        { description: 'Division 3' }
      ])
    })
}

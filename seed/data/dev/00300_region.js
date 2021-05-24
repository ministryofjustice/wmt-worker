const tableName = 'region'

exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex(tableName).del()
    .then(function () {
      // Inserts seed entries
      return knex(tableName).insert([
        { description: 'NPS Region 1' },
        { description: 'NPS Region 2' },
        { description: 'NPS Region 3' }
      ])
    })
}

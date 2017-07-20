var tableName = 'region'

exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex(tableName).del()
    .then(function () {
      // Inserts seed entries
      return knex(tableName).insert([
        { description: 'test region 1' },
        { description: 'test region 2' },
        { description: 'test region 3' }
      ])
    })
}

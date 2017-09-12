var tableName = 'users'

exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex(tableName).del()
    .then(function () {
      // Inserts seed entries
      return knex(tableName).insert([
        { username: 'johnsmith', forename: 'John', surname: 'Smith' },
        { username: 'tonytest', forename: 'Tony', surname: 'Test' },
        { username: 'janedoe', forename: 'Jane', surname: 'Doe' },
        { username: 'courtneylarry', forename: 'Courtney', surname: 'Larry' }
      ])
    })
}

var tableName = 'users'

exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex(tableName).del()
    .then(function () {
      // Inserts seed entries
      return knex(tableName).insert([
<<<<<<< HEAD
        { username: 'Manager.Test', name: 'Manager Test' },
        { username: 'System.AdminTest', name: 'System AdminTest' },
        { username: 'Data.AdminTest', name: 'Data AdminTest' }
=======
        { username: 'Manager.Test' },
        { username: 'System.AdminTest' },
        { username: 'Data.AdminTest' }
>>>>>>> master
      ])
    })
}

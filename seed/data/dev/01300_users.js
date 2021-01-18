const tableName = 'users'

exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex(tableName).del()
    .then(function () {
      // Inserts seed entries
      return knex(tableName).insert([
        { username: 'Manager.Test', name: 'Manager Test' },
        { username: 'System.AdminTest', name: 'System AdminTest' },
        { username: 'Data.AdminTest', name: 'Data AdminTest' },
        { username: 'test.E2E.Manager', name: 'Test E2E Manager' },
        { username: 'test.E2E.SystemAdmin', name: 'Test E2E System Admin' },
        { username: 'test.E2E.DataAdmin', name: 'Test E2E Data Admin' }
      ])
    })
}

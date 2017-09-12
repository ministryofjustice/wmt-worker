var tableName = 'roles'

exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex(tableName).del()
    .then(function () {
      // Inserts seed entries
      return knex(tableName).insert([
        { role: 'Staff' },
        { role: 'Manager' },
        { role: 'System Admin' },
        { role: 'Data Admin' }
      ])
    })
}

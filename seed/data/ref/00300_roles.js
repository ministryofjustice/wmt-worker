const tableName = 'roles'
const insertStatement = 'INSERT INTO app.' + tableName + ' (id, role) VALUES '

exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex(tableName).del()
    .then(function () {
      const sql = 'SET IDENTITY_INSERT app.' + tableName + ' ON;' +
      insertStatement + '(1, \'Manager\')' +
      insertStatement + '(2, \'System Admin\')' +
      insertStatement + '(3, \'Data Admin\')'
      return knex.schema
        .raw(sql)
    })
}

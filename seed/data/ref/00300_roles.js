var tableName = 'roles'
var insertStatement = 'INSERT INTO app.' + tableName + ' (id, role) VALUES '

exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex(tableName).del()
    .then(function () {
      var sql = 'SET IDENTITY_INSERT app.' + tableName + ' ON;' +
      insertStatement + '(1, \'Staff\')' +
      insertStatement + '(2, \'Manager\')' +
      insertStatement + '(3, \'System Admin\')' +
      insertStatement + '(4, \'Data Admin\')'
      return knex.schema
        .raw(sql)
    })
}

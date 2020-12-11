const tableName = 'adjustment_category'
const insertStatement = 'INSERT INTO app.' + tableName + ' (id, category) VALUES '

exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex(tableName).del()
    .then(function () {
      const sql = 'SET IDENTITY_INSERT app.' + tableName + ' ON;' +
          insertStatement + '(1, \'Case Management Support\')' +
          insertStatement + '(2, \'Group Supervision\')'
      return knex.schema
        .raw(sql)
    })
}

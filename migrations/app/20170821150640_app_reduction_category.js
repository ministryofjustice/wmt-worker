var tableName = 'reduction_category'
var insertStatement = 'INSERT INTO app.' + tableName + ' (id, category) VALUES '

exports.up = function (knex, Promise) {
  return knex.schema.createTable(tableName, function (table) {
    table.increments('id')
    table.string('category')
  }).then(function () {
    // Insert the ref data
    var sql = 'SET IDENTITY_INSERT app.' + tableName + ' ON;' +
        insertStatement + '(1, \'Personal Circumstances\')' +
        insertStatement + '(2, \'Community Justice Learning\')' +
        insertStatement + '(3, \'Work Circumstances\')'
    return knex.schema
      .raw(sql)
  }).catch(function (error) {
    console.log(error)
    throw error
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('reduction_category')
}

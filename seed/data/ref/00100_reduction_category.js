var tableName = 'reduction_category'
var insertStatement = 'INSERT INTO app.' + tableName + ' (id, category) VALUES '

exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex(tableName).del()
    .then(function () {
      var sql = 'SET IDENTITY_INSERT app.' + tableName + ' ON;' +
          insertStatement + '(1, \'Personal Circumstances\')' +
          insertStatement + '(2, \'Community Justice Learning\')' +
          insertStatement + '(3, \'Work Circumstances\')'
      return knex.schema
        .raw(sql)
    })
}

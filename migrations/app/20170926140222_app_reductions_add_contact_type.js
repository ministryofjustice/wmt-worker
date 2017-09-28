exports.up = function (knex, promise) {
  var sql = 'ALTER TABLE app.reductions ADD contact_type NVARCHAR(255)'
  return knex.schema
      .raw('SET ARITHABORT ON')
      .raw(sql)
}

exports.down = function (knex, Promise) {
  var sql = 'ALTER TABLE app.reductions DROP COLUMN contact_type'
  return knex.schema
      .raw('SET ARITHABORT ON')
      .raw(sql)
}

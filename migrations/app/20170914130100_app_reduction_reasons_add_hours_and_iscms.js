exports.up = function (knex, promise) {
  var sql = 'ALTER TABLE app.reduction_reason ADD fixed_allowance_hours DECIMAL(5,3)'
  return knex.schema
      .raw('SET ARITHABORT ON')
      .raw(sql)
}

exports.down = function (knex, Promise) {
  var sql = 'ALTER TABLE app.reduction_reason DROP COLUMN fixed_allowance_hours'
  return knex.schema
      .raw('SET ARITHABORT ON')
      .raw(sql)
}

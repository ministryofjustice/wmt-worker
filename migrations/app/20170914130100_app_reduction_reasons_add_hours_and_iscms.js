exports.up = function (knex, promise) {
  var sql = 'ALTER TABLE app.reduction_reason ADD fixed_allowance_hours DECIMAL(5,3), is_cms BIT CONSTRAINT reduction_reasons_is_cms_default DEFAULT (0)'
  return knex.schema
      .raw('SET ARITHABORT ON')
      .raw(sql)
}

exports.down = function (knex, Promise) {
  var sql = 'ALTER TABLE app.reduction_reason DROP COLUMN fixed_allowance_hours, is_cms'
  return knex.schema
      .raw('SET ARITHABORT ON')
      .raw(sql)
}

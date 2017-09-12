exports.up = function (knex, promise) {
  var sql = 'ALTER TABLE app.offender_manager DROP COLUMN grade_code'
  return knex.schema
    .raw('SET ARITHABORT ON')
    .raw(sql)
}

exports.down = function (knex, Promise) {
  var sql = 'ALTER TABLE app.offender_manager ADD grade_code varchar(5)'
  return knex.schema
    .raw('SET ARITHABORT ON')
    .raw(sql)
}

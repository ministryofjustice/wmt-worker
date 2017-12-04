exports.up = function (knex, Promise) {
  var sql = 'ALTER TABLE app.case_details ALTER COLUMN location VARCHAR(20);'
  return knex.schema
        .raw('SET ARITHABORT ON')
        .raw(sql)
}

exports.down = function (knex, Promise) {
  var sql = 'ALTER TABLE app.case_details ALTER COLUMN location VARCHAR(255);'
  return knex.schema
        .raw('SET ARITHABORT ON')
        .raw(sql)
}

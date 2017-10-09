
exports.up = function (knex, promise) {
  var sql = 'ALTER TABLE app.workload_owner ADD is_court_reporter BIT CONSTRAINT is_court_reporter_default DEFAULT 0;'
  return knex.schema
        .raw('SET ARITHABORT ON')
        .raw(sql)
}

exports.down = function (knex, Promise) {
  var sql = 'ALTER TABLE app.workload_owner DROP CONSTRAINT is_court_reporter_default;'
  sql += 'ALTER TABLE app.workload_owner DROP COLUMN is_cour_reporter;'

  return knex.schema
        .raw('SET ARITHABORT ON')
        .raw(sql)
}

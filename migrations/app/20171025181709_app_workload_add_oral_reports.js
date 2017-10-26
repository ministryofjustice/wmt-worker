exports.up = function (knex, Promise) {
  var sql = 'ALTER TABLE app.workload ADD oral_reports INT NOT NULL CONSTRAINT workload_oral_reports_default DEFAULT 0;'
  return knex.schema
    .raw('SET ARITHABORT ON')
    .raw(sql)
}

exports.down = function (knex, Promise) {
  var sql = 'ALTER TABLE app.workload DROP CONSTRAINT workload_oral_reports_default;'
  sql += 'ALTER TABLE app.workload DROP COLUMN oral_reports;'
  return knex.schema
    .raw('SET ARITHABORT ON')
    .raw(sql)
}

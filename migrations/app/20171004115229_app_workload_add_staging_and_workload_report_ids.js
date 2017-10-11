exports.up = function (knex, promise) {
  var sql = 'ALTER TABLE app.workload ADD staging_id INT;' +
    'ALTER TABLE app.workload ADD workload_report_id INT;' +
    'CREATE INDEX ix_workload_staging_id ON app.workload (staging_id);'
  return knex.schema
      .raw('SET ARITHABORT ON')
      .raw(sql)
}

exports.down = function (knex, Promise) {
  var sql = 'DROP INDEX ix_workload_staging_id ON app.workload;' +
    'ALTER TABLE app.workload DROP COLUMN staging_id;' +
    'ALTER TABLE app.workload DROP COLUMN workload_report_id;'
  return knex.schema
      .raw('SET ARITHABORT ON')
      .raw(sql)
}

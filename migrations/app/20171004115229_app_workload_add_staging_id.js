exports.up = function (knex, promise) {
  var sql = 'ALTER TABLE app.workload ADD staging_id INT;' +
    'CREATE INDEX ix_workload ON app.workload (staging_id);'
  return knex.schema
      .raw('SET ARITHABORT ON')
      .raw(sql)
}

exports.down = function (knex, Promise) {
  var sql = 'ALTER TABLE app.workload DROP COLUMN staging_id'
  return knex.schema
      .raw('SET ARITHABORT ON')
      .raw(sql)
}

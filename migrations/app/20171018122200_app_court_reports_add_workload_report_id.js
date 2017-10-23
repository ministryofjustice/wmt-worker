exports.up = function (knex, Promise) {
  var sql = 'ALTER TABLE app.court_reports ADD workload_report_id INT;'
  return knex.schema
            .raw('SET ARITHABORT ON')
            .raw(sql)
}

exports.down = function (knex, Promise) {
  var sql = 'ALTER TABLE app.court_reports DROP COLUMN workload_report_id;'
  return knex.schema
            .raw('SET ARITHABORT ON')
            .raw(sql)
}

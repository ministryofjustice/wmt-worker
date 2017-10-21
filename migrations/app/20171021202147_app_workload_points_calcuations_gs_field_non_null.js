exports.up = function (knex, Promise) {
  var sql = 'UPDATE app.workload_points_calculations SET gs_adjustment_points = 0 WHERE gs_adjustment_points IS NULL;'
  sql += 'UPDATE app.workload_points_calculations SET cms_adjustment_points = 0 WHERE cms_adjustment_points IS NULL;'
  sql += 'ALTER TABLE app.workload_points_calculations ALTER COLUMN gs_adjustment_points DECIMAL (5,2) NOT NULL;'
  sql += 'ALTER TABLE app.workload_points_calculations ALTER COLUMN cms_adjustment_points INT NOT NULL;'
  return knex.schema
        .raw('SET ARITHABORT ON')
        .raw(sql)
}

exports.down = function (knex, Promise) {
  var sql = 'ALTER TABLE app.workload_points_calculations ALTER COLUMN gs_adjustment_points DECIMAL (5,2);'
  sql += 'ALTER TABLE app.workload_points_calculations ALTER COLUMN gs_adjustment_points DECIMAL (5,2);'
  return knex.schema
        .raw('SET ARITHABORT ON')
        .raw(sql)
}

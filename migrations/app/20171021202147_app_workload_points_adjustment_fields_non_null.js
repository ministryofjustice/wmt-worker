exports.up = function (knex, Promise) {
  var sql = 'UPDATE app.workload_points_calculations SET gs_adjustment_points = 0 WHERE gs_adjustment_points IS NULL;'
  sql += 'UPDATE app.workload_points_calculations SET cms_adjustment_points = 0 WHERE cms_adjustment_points IS NULL;'
  sql += 'ALTER TABLE app.workload_points_calculations DROP CONSTRAINT wpc_gs_adjustment_points_default;'
  sql += 'ALTER TABLE app.workload_points_calculations DROP CONSTRAINT wpc_cms_adjustment_points_default;'
  sql += 'ALTER TABLE app.workload_points_calculations ALTER COLUMN gs_adjustment_points INT NOT NULL;'
  sql += 'ALTER TABLE app.workload_points_calculations ALTER COLUMN cms_adjustment_points INT NOT NULL;'
  sql += 'ALTER TABLE app.workload_points_calculations ADD CONSTRAINT wpc_cms_adjustment_points_default DEFAULT 0 FOR cms_adjustment_points;'
  sql += 'ALTER TABLE app.workload_points_calculations ADD CONSTRAINT wpc_gs_adjustment_points_default DEFAULT 0 FOR gs_adjustment_points;'
  return knex.schema
        .raw('SET ARITHABORT ON')
        .raw(sql)
}

exports.down = function (knex, Promise) {
  var sql = 'ALTER TABLE app.workload_points_calculations ALTER COLUMN gs_adjustment_points INT;'
  sql += 'ALTER TABLE app.workload_points_calculations ALTER COLUMN cms_adjustment_points INT;'
  sql += 'ALTER TABLE app.workload_points_calculations ADD CONSTRAINT wpc_cms_adjustment_points_default DEFAULT 0 FOR cms_adjustment_points;'
  sql += 'ALTER TABLE app.workload_points_calculations ADD CONSTRAINT wpc_gs_adjustment_points_default DEFAULT 0 FOR gs_adjustment_points;'
  return knex.schema
        .raw('SET ARITHABORT ON')
        .raw(sql)
}

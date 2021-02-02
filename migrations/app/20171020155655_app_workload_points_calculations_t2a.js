exports.up = function (knex, Promise) {
  let sql = 'ALTER TABLE app.workload_points_calculations ADD t2a_workload_points_id INT;'
  sql += 'ALTER TABLE app.workload_points_calculations ADD CONSTRAINT workload_points_calculations_t2a_workload_points_id_foreign FOREIGN KEY (t2a_workload_points_id) REFERENCES app.workload_points(id);'
  return knex.schema
    .raw('SET ARITHABORT ON')
    .raw(sql)
}

exports.down = function (knex, Promise) {
  let sql = 'ALTER TABLE app.workload_points_calculations DROP CONSTRAINT workload_points_calculations_t2a_workload_points_id_foreign;'
  sql += 'ALTER TABLE app.workload_points_calculations DROP COLUMN t2a_workload_points_id;'
  return knex.schema
    .raw('SET ARITHABORT ON')
    .raw(sql)
}

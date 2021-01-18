exports.up = function (knex, promise) {
  const sql = 'ALTER TABLE app.workload_points ADD is_t2a BIT NOT NULL CONSTRAINT workload_points_is_t2a_default DEFAULT 0;'
  return knex.schema
    .raw('SET ARITHABORT ON')
    .raw(sql)
}

exports.down = function (knex, Promise) {
  let sql = 'ALTER TABLE app.workload_points DROP CONSTRAINT workload_points_is_t2a_default;'
  sql += 'ALTER TABLE app.workload_points DROP COLUMN is_t2a;'
  return knex.schema
    .raw('SET ARITHABORT ON')
    .raw(sql)
}

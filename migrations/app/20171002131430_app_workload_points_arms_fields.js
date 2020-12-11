exports.up = function (knex, promise) {
  let sql = 'ALTER TABLE app.workload_points ADD weighting_arms_lic INT CONSTRAINT weighting_arms_lic_default DEFAULT 0;'
  sql += 'ALTER TABLE app.workload_points ADD weighting_arms_comm INT CONSTRAINT weighting_arms_comm_default DEFAULT 0;'
  return knex.schema
    .raw('SET ARITHABORT ON')
    .raw(sql)
}

exports.down = function (knex, Promise) {
  let sql = 'ALTER TABLE app.workload_points DROP CONSTRAINT weighting_arms_lic_default;'
  sql += 'ALTER TABLE app.workload_points DROP CONSTRAINT weighting_arms_comm_default;'
  sql += 'ALTER TABLE app.workload_points DROP COLUMN weighting_arms_lic;'
  sql += 'ALTER TABLE app.workload_points DROP COLUMN weighting_arms_comm;'

  return knex.schema
    .raw('SET ARITHABORT ON')
    .raw(sql)
}

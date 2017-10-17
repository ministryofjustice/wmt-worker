exports.up = function (knex, promise) {
  var sql = 'ALTER TABLE app.workload_points ADD is_t2a BIT;'
  return knex.schema
        .raw('SET ARITHABORT ON')
        .raw(sql)
}

exports.down = function (knex, Promise) {
  var sql = 'ALTER TABLE app.workload_points DROP COLUMN is_t2a;'
  return knex.schema
        .raw('SET ARITHABORT ON')
        .raw(sql)
}

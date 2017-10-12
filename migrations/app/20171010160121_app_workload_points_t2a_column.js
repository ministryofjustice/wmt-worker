exports.up = function (knex, promise) {
  var sql = 'ALTER TABLE app.workload_points ADD isT2A BIT;'
  return knex.schema
        .raw('SET ARITHABORT ON')
        .raw(sql)
}

exports.down = function (knex, Promise) {
  var sql = 'ALTER TABLE app.workload_points DROP COLUMN isT2A;'
  return knex.schema
        .raw('SET ARITHABORT ON')
        .raw(sql)
}

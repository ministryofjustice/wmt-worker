exports.up = function (knex, promise) {
  var sql = 'ALTER TABLE app.workload ADD t2a_cases INT;'
  return knex.schema
        .raw('SET ARITHABORT ON')
        .raw(sql)
}

exports.down = function (knex, Promise) {
  var sql = 'ALTER TABLE app.workload_points DROP COLUMN t2a_cases;'
  return knex.schema
        .raw('SET ARITHABORT ON')
        .raw(sql)
}

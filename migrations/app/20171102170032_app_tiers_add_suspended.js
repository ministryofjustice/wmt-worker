exports.up = function (knex, promise) {
  const sql = 'ALTER TABLE app.tiers ADD suspended_total INT NOT NULL CONSTRAINT tiers_suspended_total_default DEFAULT 0;'
  return knex.schema
    .raw('SET ARITHABORT ON')
    .raw(sql)
}

exports.down = function (knex, Promise) {
  let sql = 'ALTER TABLE app.tiers DROP CONSTRAINT tiers_suspended_total_default;'
  sql += 'ALTER TABLE app.tiers DROP COLUMN suspended_total;'
  return knex.schema
    .raw('SET ARITHABORT ON')
    .raw(sql)
}

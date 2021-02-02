exports.up = function (knex, Promise) {
  let sql = 'ALTER TABLE app.reductions ADD updated_date DATETIME NOT NULL CONSTRAINT updated_date_default DEFAULT GETDATE();'
  sql += 'ALTER TABLE app.reductions ADD user_id INT NULL;'
  return knex.schema
    .raw('SET ARITHABORT ON')
    .raw(sql)
}

exports.down = function (knex, Promise) {
  let sql = 'ALTER TABLE app.reductions DROP CONSTRAINT updated_date_default;'
  sql += 'ALTER TABLE app.reductions DROP COLUMN updated_date;'
  sql += 'ALTER TABLE app.reductions DROP COLUMN user_id;'
  return knex.schema
    .raw('SET ARITHABORT ON')
    .raw(sql)
}

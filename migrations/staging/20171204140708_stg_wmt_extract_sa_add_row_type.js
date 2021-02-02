exports.up = function (knex, Promise) {
  const sql = 'ALTER TABLE staging.wmt_extract_sa ADD row_type VARCHAR(8) NOT NULL CONSTRAINT row_type_default DEFAULT \'S\';'
  return knex.schema
    .raw('SET ARITHABORT ON')
    .raw(sql)
}

exports.down = function (knex, Promise) {
  let sql = 'ALTER TABLE staging.wmt_extract_sa DROP CONSTRAINT row_type_default;'
  sql += 'ALTER TABLE staging.wmt_extract_sa DROP COLUMN row_type;'
  return knex.schema
    .raw('SET ARITHABORT ON')
    .raw(sql)
}

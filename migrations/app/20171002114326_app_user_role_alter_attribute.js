
exports.up = function (knex, Promise) {
  var sql = 'ALTER TABLE app.user_role DROP CONSTRAINT user_role_last_updated_by_foreign;' +
        'ALTER TABLE app.user_role ALTER COLUMN last_updated_by nvarchar(255) NULL'
  return knex.schema
        .raw('SET ARITHABORT ON')
        .raw(sql)
}

exports.down = function (knex, Promise) {
  try {
    var sql = 'ALTER TABLE app.user_role ALTER COLUMN last_updated_by int; ALTER TABLE app.user_role ALTER COLUMN last_updated_by int NULL;' +
        'ALTER TABLE app.user_role ADD CONSTRAINT user_role_last_updated_by_foreign FOREIGN KEY (last_updated_by) REFERENCES app.users(id);' +
        'ALTER TABLE app.user_role ALTER COLUMN last_updated_by int NOT NULL'
    return knex.schema
        .raw('SET ARITHABORT ON')
        .raw(sql)
  } catch (error) {
        // If the data is populated its possible this will not work.
    console.log(error)
  }
}

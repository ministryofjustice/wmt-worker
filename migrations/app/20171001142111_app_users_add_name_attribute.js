
exports.up = function (knex, Promise) {
  return knex.schema.table('users', function (table) {
    table.string('name')
  }).catch(function (error) {
    console.log(error)
    throw error
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.table('users', function (t) {
    t.dropColumn('name')
  })
}

exports.up = function (knex, Promise) {
  return knex.schema.withSchema('staging').table('court_reports', function (table) {
    table.string('oral_reports')
  }).catch(function (error) {
    console.log(error)
    throw error
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.withSchema('staging').table('court_reports', function (table) {
    table.dropColumn('oral_reports')
  })
}

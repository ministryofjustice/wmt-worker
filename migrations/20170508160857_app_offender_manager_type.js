
exports.up = function (knex, Promise) {
  return knex.schema.withSchema('app').createTable('offender_manager_type', function (table) {
    table.increments('id')
    table.string('description')
  }).catch(function (error) {
    console.log(error)
    throw error
  })
}

exports.down = function (knex, Promise) {
  knex.schema.withSchema('app').dropTable('offender_manager_type')
}

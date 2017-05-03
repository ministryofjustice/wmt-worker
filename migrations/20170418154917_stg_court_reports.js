
exports.up = function (knex, Promise) {
  return knex.schema.createTable('stg_court_reports', function (table) {
    table.increments('id')
    table.string('om_team_staff_grade')
    table.string('sdr_last_30')
    table.string('sdr_due_next_30')
    table.string('sdr_conv_last_30')
  }).catch(function (error) {
    console.log(error)
    throw error
  })
}

exports.down = function (knex, Promise) {
  knex.schema.dropTable('stg_court_reports')
}


exports.up = function (knex, Promise) {
  return knex.schema.withSchema('staging').createTable('inst_reports', function (table) {
    table.increments('id')
    table.string('team_desc')
    table.string('team_code')
    table.string('om_name')
    table.string('om_key')
    table.string('om_team_staff_grade')
    table.string('parom_due_next_30')
    table.string('parom_comp_last_30')
    table.string('datestamp')
  }).catch(function (error) {
    console.log(error)
    throw error
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.withSchema('staging').dropTable('inst_reports')
}

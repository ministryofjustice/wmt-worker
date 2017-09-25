
exports.up = function (knex, Promise) {
  return knex.schema.withSchema('staging').createTable('cms', function (table) {
    table.increments('id')
    table.string('contact_id')
    table.string('contact_date')
    table.string('contact_type_code')
    table.string('contact_type_desc')
    table.string('contact_staff_name')
    table.string('contact_staff_key')
    table.string('contact_staff_grade')
    table.string('contact_team_key')
    table.string('contact_provider_code')
    table.string('om_name')
    table.string('om_key')
    table.string('om_grade')
    table.string('om_team_key')
    table.string('om_provider_code')
  }).catch(function (error) {
    console.log(error)
    throw error
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.withSchema('staging').dropTable('cms')
}

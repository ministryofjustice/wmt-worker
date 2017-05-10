
exports.up = function(knex, Promise) {
  return knex.schema.createTable('offender_manager', function (table) {
    table.increments('id')
    table.bigInteger('om_type_id').references('id').inTable('offender_manager_type')
    table.timestamp('effective_from').defaultTo(knex.fn.now())
    table.timestamp('effective_to')
  }).catch(function (error) {
    console.log(error)
    throw error
  })
};

exports.down = function(knex, Promise) {
  knex.schema.dropTable('offender_manager')
};

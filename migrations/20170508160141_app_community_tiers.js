
exports.up = function(knex, Promise) {
  return knex.schema.withSchema('app').createTable('community_tiers', function (table) {
    table.increments('id')
    table.bigInteger('workload_id').references('id').inTable('workload')
    table.integer('tier_type').unsigned()
    table.string('case_type', 5)
    table.bigInteger('points').unsigned()
  }).catch(function (error) {
    console.log(error)
    throw error
  })
};

exports.down = function(knex, Promise) {
  knex.schema.dropTable('community_tiers')
};

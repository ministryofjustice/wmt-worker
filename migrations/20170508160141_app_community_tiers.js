
exports.up = function(knex, Promise) {
  return knex.schema.withSchema('app').createTable('community_tiers', function (table) {
    table.increments('id')
    table.bigInteger('workload_id').references('id').inTable('workload')
  }).catch(function (error) {
    console.log(error)
    throw error
  })
};

exports.down = function(knex, Promise) {
  knex.schema.dropTable('community_tiers')
};

exports.up = function(knex, Promise) {
  return knex.schema.createTable('reduction_category', function (table) {
    table.increments('id')
    table.string('category')
  }).catch(function (error) {
    console.log(error)
    throw error
  })  
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('reduction_category')
};

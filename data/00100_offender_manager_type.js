var tableName = 'offender_manager_type'
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex(tableName).del()
    .then(function () {
      // Inserts seed entries
      return knex(tableName).insert([
        { description: 'Probation Officer' }
      ]);
    });
};

var tableName = 'ldu'

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex(tableName).del()
    .return(knex('region').select('id').first())
    .then(function (regionId) {
      // Inserts seed entries
      return knex(tableName).insert([
        { description: 'test ldu' , region_id: regionId.id}
      ]);
    });
};

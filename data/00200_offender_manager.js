var tableName = 'offender_manager'

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex(tableName).del()
      .then(function () {
          return knex('offender_manager_type').select('id').where({description: 'Probation Officer'}).first()
      })
    .then(function (probationOfficerTypeId) {
      // Inserts seed entries
      return knex(tableName).insert([
        { om_type_id: probationOfficerTypeId.id, om_key: "JS01", first_name: "John", last_name: "Smith" }
      ]);
    });
};

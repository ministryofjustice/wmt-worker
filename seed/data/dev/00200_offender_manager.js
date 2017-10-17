var tableName = 'offender_manager'

exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex(tableName).del()
  .then(function () {
    return knex('offender_manager_type').select('id').where({description: 'Probation Officer'}).first()
    .then(function (probationOfficerTypeId) {
      return knex('offender_manager_type').select('id').where({description: 'Probation Support Officer'}).first()
      .then(function (probationSupportOfficerTypeId) {
        // Inserts seed entries
        return knex(tableName).insert([
          { type_id: probationOfficerTypeId.id, key: 'JS01', forename: 'John', surname: 'Smith' },
          { type_id: probationSupportOfficerTypeId.id, key: 'JS02', forename: 'Tony', surname: 'Test' },
          { type_id: probationOfficerTypeId.id, key: 'JS03', forename: 'Jane', surname: 'Doe' },
          { type_id: probationSupportOfficerTypeId.id, key: 'JS04', forename: 'Marcin', surname: 'Martin' },
          { type_id: probationOfficerTypeId.id, key: 'JS05', forename: 'Courtney', surname: 'Larry' },
          { type_id: probationOfficerTypeId.id, key: 'CR01', forename: 'Courts', surname: 'John' },
          { type_id: probationOfficerTypeId.id, key: 'CR02', forename: 'Reports', surname: 'Frank' }
        ])
      })
    })
  })
}

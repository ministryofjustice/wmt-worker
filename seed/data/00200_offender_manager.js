var tableName = 'offender_manager'

exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex(tableName).del()
      .then(function () {
        return knex('offender_manager_type').select('id').where({description: 'Probation Officer'}).first()
      })
    .then(function (probationOfficerTypeId) {
      // Inserts seed entries
      return knex(tableName).insert([
        { type_id: probationOfficerTypeId.id, key: 'JS01', forename: 'John', surname: 'Smith', grade_code: 'C' },
        { type_id: probationOfficerTypeId.id, key: 'JS02', forename: 'Tony', surname: 'Test', grade_code: 'C' },
        { type_id: probationOfficerTypeId.id, key: 'JS03', forename: 'Jane', surname: 'Doe', grade_code: 'C' },
        { type_id: probationOfficerTypeId.id, key: 'JS04', forename: 'Marcin', surname: 'Martin', grade_code: 'C' },
        { type_id: probationOfficerTypeId.id, key: 'JS05', forename: 'Courtney', surname: 'Larry', grade_code: 'C' }
      ])
    })
}

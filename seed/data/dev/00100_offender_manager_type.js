var tableName = 'offender_manager_type'
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex(tableName).del()
    .then(function () {
      // Inserts seed entries
      return knex(tableName).insert([
        { description: 'Probation Officer', grade_code: 'PO' },
        { description: 'Probation Support Officer', grade_code: 'PSO' },
        { description: 'Senior Probation Officer', grade_code: 'SPO' },
        { description: 'Trainee Probation Officer', grade_code: 'TPO' },
        { description: 'Dummy Grade', grade_code: 'DMY' }
      ])
    })
}

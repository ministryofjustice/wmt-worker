const knex = require('../../../knex').appSchema

module.exports = function (gradeCode) {
  return knex('offender_manager_type').withSchema('app')
    .where({ grade_code: gradeCode })
    .first()
    .then(function (result) {
      if (result === undefined) {
        return knex('offender_manager_type').withSchema('app')
          .insert({ grade_code: gradeCode })
          .returning('id')
      } else {
        return result.id
      }
    })
}

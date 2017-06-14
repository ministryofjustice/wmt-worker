const knexConfig = require('../../../knexfile').app
const knex = require('knex')(knexConfig)

module.exports = function (gradeCode) {
  return knex('offender_manager_type')
    .where({ grade_code: gradeCode })
    .first()
    .then(function (result) {
      if (result === undefined) {
        return knex('offender_manager_type')
          .insert({ grade_code: gradeCode })
          .returning('id')
      } else {
        return result['id']
      }
    })
}

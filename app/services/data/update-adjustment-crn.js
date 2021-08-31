const knex = require('../../../knex').appSchema

module.exports = function (id, crn) {
  return knex('adjustments')
    .withSchema('app')
    .where('id', id)
    .update('case_ref_no', crn)
    .returning('id')
    .then(function (results) {
      return results[0]
    })
}

const knex = require('../../../knex').appSchema

module.exports = function (id, effectiveTo) {
  return knex('adjustments')
    .where('id', id)
    .update('effective_to', effectiveTo)
    .returning('id')
    .then(function (results) {
      return results[0]
    })
}

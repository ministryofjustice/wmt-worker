const knex = require('../../../knex').appSchema

module.exports = function (reduction) {
  return knex('reductions')
    .withSchema('app')
    .insert(reduction)
    .returning('id')
}

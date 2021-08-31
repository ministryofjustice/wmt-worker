const knex = require('../../../knex').appSchema

module.exports = function (ids, status) {
  return knex('reductions').withSchema('app').whereIn('id', ids)
    .update('status', status)
}

const knex = require('../../../knex').appSchema

module.exports = function (ids, status) {
  return knex('adjustments').withSchema('app').whereIn('id', ids)
    .update('status', status)
}

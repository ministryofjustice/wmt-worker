const knex = require('../../../knex').appSchema

module.exports = function (ids, status) {
  return knex('adjustments').whereIn('id', ids)
    .update('status', status)
}

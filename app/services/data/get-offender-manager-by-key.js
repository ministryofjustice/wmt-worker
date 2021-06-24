const knex = require('../../../knex').appSchema

module.exports = function (offenderManagerKey) {
  return knex('offender_manager')
    .withSchema('app')
    .where({ key: offenderManagerKey })
    .first()
}

const knex = require('../../../knex').appSchema

module.exports = function (offenderManagerKey) {
  return knex('app.offender_manager')
    .where({ key: offenderManagerKey })
    .first()
}

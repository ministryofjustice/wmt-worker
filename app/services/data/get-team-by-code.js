const knex = require('../../../knex').appSchema

module.exports = function (teamCode) {
  return knex.select().from('team')
    .withSchema('app')
    .where('code', teamCode)
    .first()
}

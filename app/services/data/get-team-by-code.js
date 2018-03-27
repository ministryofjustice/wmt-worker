const knex = require('../../../knex').appSchema

module.exports = function (teamCode) {
  return knex.select().from('app.team')
    .where('code', teamCode)
    .first()
}

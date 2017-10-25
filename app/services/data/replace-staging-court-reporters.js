const knex = require('../../../knex').stagingSchema

module.exports = function (courtReporters) {
  return knex('court_reporters').del()
  .then(function () {
    return knex('court_reporters')
      .insert(courtReporters)
      .returning('id')
  })
}

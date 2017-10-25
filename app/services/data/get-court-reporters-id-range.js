const knex = require('../../../knex').appSchema
const IdRange = require('../domain/id-range')

module.exports = function () {
  return knex.withSchema('staging').max('id AS last_id').min('id AS first_id').table('court_reporters')
    .then(function (results) {
      return new IdRange(results[0].first_id, results[0].last_id)
    })
}

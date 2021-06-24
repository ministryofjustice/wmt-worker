const knex = require('../../../knex').stagingSchema
const IdRange = require('../domain/id-range')

module.exports = function () {
  return knex('wmt_extract').withSchema('staging').max('id AS last_id').min('id AS first_id')
    .then(function (results) {
      return new IdRange(results[0].first_id, results[0].last_id)
    })
}

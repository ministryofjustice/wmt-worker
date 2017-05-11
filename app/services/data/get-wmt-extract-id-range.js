const config = require('../../../knexfile').development
const knex = require('knex')(config)
const IdRange = require('../domain/id-range')

module.exports = function () {
  return knex.withSchema('staging').max('id as last_id').min('id as first_id').table('wmt_extract')
    .then(function (results) {
      return new IdRange(results[0].first_id, results[0].last_id)
    })
}

const knex = require('../../../knex').appSchema

module.exports = function () {
  return knex
    .select(knex.raw('count(*) as theCount'), 'description')
    .from('team')
    .withSchema('app')
    .groupBy('description')
    .having(knex.raw('count(*)'), '>', 1)
    .then((results) => {
      const resultsArray = []
      results.forEach((result) => {
        resultsArray.push(result.description.toLowerCase())
      })
      return resultsArray
    })
}

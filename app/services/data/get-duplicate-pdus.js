const knex = require('../../../knex').appSchema

module.exports = function () {
  return knex
    .select(knex.count('* as theCount'), 'description')
    .from('ldu')
    .withSchema('app')
    .groupBy('description')
    .having(knex.count('*'), '>', 1)
    .then((results) => {
      const resultsArray = []
      results.forEach((result) => {
        resultsArray.push(result.description.toLowerCase())
      })
      return resultsArray
    })
}

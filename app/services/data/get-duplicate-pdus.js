const knex = require('../../../knex').appSchema

module.exports = function () {
  return knex.schema.raw(
    'SELECT COUNT(*) AS theCount, description FROM app.ldu GROUP BY description HAVING COUNT(*) > 1'
  )
    .then((results) => {
      const resultsArray = []
      results.forEach((result) => {
        resultsArray.push(result.description.toLowerCase())
      })
      return resultsArray
    })
}

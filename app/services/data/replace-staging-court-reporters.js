const knex = require('../../../knex').stagingSchema

module.exports = function (courtReporters) {
  // Default to ((2100 / 16) - 1). This is to avoid 2100 parameter server error.
  // 16 is the number columns in this table and 2100 is number of max parameters.
  var batchSize = 130
  if (courtReporters instanceof Array) {
    if (courtReporters.length > 8) {
      batchSize = Math.floor(courtReporters.length / 16) + 1
    }
  }
  return knex('court_reporters').del()
  .then(function () {
    return knex.batchInsert('court_reporters', courtReporters, batchSize)
    .returning('id')
  })
}

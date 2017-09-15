const knexConfig = require('../../../knexfile').app
const knex = require('knex')(knexConfig)

module.exports = function (reductionReasonDescription) {
  return knex('reduction_reason')
    .where('reason', reductionReasonDescription)
    .first('id', 'fixed_allowance_hours AS fixedAllowanceHours')
    .then(function (result) {
      return result
    })
}

const knexConfig = require('../../../knexfile').app
const knex = require('knex')(knexConfig)

module.exports = function (reductionReasonCode) {
  return knex('reduction_reason')
    .where('reason', reductionReasonCode)
    .first('id', 'fixed_allowance_hours AS fixedAllowanceHours')
    .then(function (result) {
      return result
    })
}

const knexConfig = require('../../../knexfile').app
const knex = require('knex')(knexConfig)

module.exports = function (adjustmentReasonCode) {
  return knex('adjustment_reason')
    .where('reason', adjustmentReasonCode)
    .first('id',
          'points AS points')
}

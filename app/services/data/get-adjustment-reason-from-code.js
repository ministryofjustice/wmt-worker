const knex = require('../../../knex').appSchema

module.exports = function (adjustmentReasonCode) {
  return knex('adjustment_reason')
    .where('contact_code', adjustmentReasonCode)
    .first('id',
          'points AS points')
}

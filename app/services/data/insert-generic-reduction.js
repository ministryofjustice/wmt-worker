const knex = require('../../../knex').appSchema
const moment = require('moment')

module.exports = function (workloadOwnerId, reductionHours) {
  if (reductionHours > 0) {
    return knex('reduction_reason').first('id').where('reason', 'Other')
      .then(function (reductionReason) {
        return knex('users').first('id').where('username', 'test.E2E.Manager')
          .then(function (user) {
            return knex('reductions')
              .insert({
                reduction_reason_id: reductionReason.id,
                workload_owner_id: workloadOwnerId,
                hours: reductionHours,
                effective_from: moment().add(-90, 'M').format('YYYY-MM-DD'),
                effective_to: moment().add(90, 'M').format('YYYY-MM-DD'),
                status: 'ACTIVE',
                updated_date: moment().format('YYYY-MM-DD'),
                user_id: user.id
              })
          })
      })
  } else {
    return Promise.resolve()
  }
}

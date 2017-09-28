const knexConfig = require('../../../knexfile').app
const knex = require('knex')(knexConfig)
const reductionStatus = require('../../constants/reduction-status')

module.exports = function (workloadOwnerId, reductionType) {
  var whereObject = {
    workload_owner_id: workloadOwnerId
  }

  if (reductionType === undefined) {
    whereObject.contact_type = null
  } else {
    whereObject.contact_type = reductionType
  }

  return knex('reductions')
    .sum('hours AS hours')
    .where(whereObject)
    .andWhere('status', reductionStatus.ACTIVE)
    .then(function (result) {
      if (result === null || result[0].hours === null) {
        return 0
      } else {
        return result[0].hours
      }
    })
}

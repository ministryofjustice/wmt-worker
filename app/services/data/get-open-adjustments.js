const knexConfig = require('../../../knexfile').app
const knex = require('knex')(knexConfig)

module.exports = function (workloadIdStart, workloadIdEnd) {
  return knex('adjustments')
    .join('workload', 'workload.workload_owner_id', 'reductions.workload_owner_id')
    .select(
      'adjustments.id AS id',
      'adjustments.effective_from AS effectiveFrom',
      'adjustments.effective_to AS effectiveTo',
      'adjustments.status AS status'
    )
    .whereRaw('workload.id BETWEEN ? AND ? AND (status is null OR status in (\'ACTIVE\',\'SCHEDULED\'))',
    [workloadIdStart, workloadIdEnd])
}

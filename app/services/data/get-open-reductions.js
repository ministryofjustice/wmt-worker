const knexConfig = require('../../../knexfile').app
const knex = require('knex')(knexConfig)

module.exports = function (workloadIdStart, workloadIdEnd) {
  return knex('reductions')
    .join('workload', 'workload.workload_owner_id', 'reductions.workload_owner_id')
    .select(
      'reductions.id AS id',
      'reductions.effective_from AS effectiveFrom',
      'reductions.effective_to AS effectiveTo',
      'reductions.status AS status'
    )
    .whereRaw('workload.id BETWEEN ? AND ? AND (status IS NULL OR status IN (\'ACTIVE\',\'SCHEDULED\'))',
      [workloadIdStart, workloadIdEnd])
}

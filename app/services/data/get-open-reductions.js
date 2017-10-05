const knexConfig = require('../../../knexfile').app
const knex = require('knex')(knexConfig)

module.exports = function (workloadStagingIdStart, workloadStagingIdEnd) {
  return knex('reductions')
    .join('workload', 'workload.workload_owner_id', 'reductions.workload_owner_id')
    .select(
      'reductions.id AS id',
      'reductions.effective_from AS effectiveFrom',
      'reductions.effective_to AS effectiveTo',
      'reductions.status AS status'
    )
    .whereRaw('workload.staging_id BETWEEN ? AND ? AND (status IS NULL OR status IN (\'ACTIVE\',\'SCHEDULED\'))',
      [workloadStagingIdStart, workloadStagingIdEnd])
}

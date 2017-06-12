const config = require('../../../config')
const knexConfig = require('../../../knexfile').development
const knex = require('knex')(knexConfig)

module.exports = function (workloadReportId, workloadPointsId, workloadId, totalPoints, sdrPoints, sdrPointsConversion, paromsPoints, nominalTarget, availablePoints) {
  return knex(`${config.DB_APP_SCHEMA}.workload_points_calculations`).insert(
    {
      workload_report_id: workloadReportId,
      workload_points_id: workloadPointsId,
      workload_id: workloadId,
      total_points: totalPoints,
      sdr_points: sdrPoints,
      sdr_conversion_points: sdrPointsConversion,
      paroms_points: paromsPoints,
      nominal_target: nominalTarget,
      available_points: availablePoints,
      effective_from: new Date()
    }).returning('id')
}

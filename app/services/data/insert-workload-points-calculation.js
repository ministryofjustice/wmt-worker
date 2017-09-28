const knexConfig = require('../../../knexfile').app
const knex = require('knex')(knexConfig)

module.exports = function (workloadReportId, workloadPointsId, workloadId, totalPoints, sdrPoints, sdrPointsConversion, paromsPoints, nominalTarget, availablePoints, contractedHours, reductionHours, cmsReductionHours, gsReductionHours) {
  return knex(`workload_points_calculations`).insert(
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
      contracted_hours: contractedHours,
      reduction_hours: reductionHours,
      cms_reduction_hours: cmsReductionHours,
      gs_reduction_hours: gsReductionHours
    }).returning('id')
}

const knexConfig = require('../../../knexfile').app
const knex = require('knex')(knexConfig)

module.exports = function (workloadReportId, workloadPointsId, workloadId, totalPoints, sdrPoints,
  sdrPointsConversion, paromsPoints, nominalTarget, availablePoints, reductionHours, contractedHours, cmsReductionHours) {
  return knex(`workload_points_calculations`)
    .where('workload_report_id', workloadReportId)
    .where('workload_id', workloadId)
    .update({
      workload_points_id: workloadPointsId,
      total_points: totalPoints,
      sdr_points: sdrPoints,
      sdr_conversion_points: sdrPointsConversion,
      paroms_points: paromsPoints,
      nominal_target: nominalTarget,
      available_points: availablePoints,
      reduction_hours: reductionHours,
      cms_reduction_hours: cmsReductionHours,
      contracted_hours: contractedHours
    })
}

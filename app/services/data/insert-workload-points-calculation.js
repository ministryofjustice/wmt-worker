const knex = require('../../../knex').appSchema

module.exports = function (workloadReportId, workloadPointsId, workloadId, totalPoints, sdrPoints, sdrPointsConversion,
  paromsPoints, nominalTarget, availablePoints, contractedHours, reductionHours, cmsAdjustmentPoints, gsAdjustmentPoints,
  armsTotalCases) {
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
      cms_adjustment_points: cmsAdjustmentPoints,
      gs_adjustment_points: gsAdjustmentPoints,
      arms_total_cases: armsTotalCases
    }).returning('id')
}

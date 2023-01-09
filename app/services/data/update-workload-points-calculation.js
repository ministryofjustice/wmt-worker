const knex = require('../../../knex').appSchema

module.exports = function (workloadReportId, workloadPointsId, t2aWorkloadPointsId, workloadId, totalPoints, sdrPoints, sdrPointsConversion,
  nominalTarget, availablePoints, contractedHours, reductionHours, cmsAdjustmentPoints, gsAdjustmentPoints) {
  return knex('workload_points_calculations')
    .withSchema('app')
    .where('workload_report_id', workloadReportId)
    .where('workload_id', workloadId)
    .update({
      workload_points_id: workloadPointsId,
      total_points: totalPoints,
      sdr_points: sdrPoints,
      sdr_conversion_points: sdrPointsConversion,
      nominal_target: nominalTarget,
      available_points: availablePoints,
      reduction_hours: reductionHours,
      cms_adjustment_points: cmsAdjustmentPoints,
      contracted_hours: contractedHours,
      gs_adjustment_points: gsAdjustmentPoints,
      t2a_workload_points_id: t2aWorkloadPointsId,
      last_updated_on: new Date()
    })
}

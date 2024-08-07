const knex = require('../../../knex').appSchema

module.exports = function (workloadReportId, workloadPointsId, t2aWorkloadPointsId, workloadId, custodyPoints, licensePoints, sdrPoints, sdrPointsConversion,
  nominalTarget, availablePoints, contractedHours) {
  return knex('omic_workload_points_calculations')
    .withSchema('app')
    .where('workload_report_id', workloadReportId)
    .where('omic_workload_id', workloadId)
    .update({
      workload_points_id: workloadPointsId,
      custody_points: custodyPoints,
      licence_points: licensePoints,
      sdr_points: sdrPoints,
      sdr_conversion_points: sdrPointsConversion,
      paroms_points: 0,
      nominal_target: nominalTarget,
      available_points: availablePoints,
      contracted_hours: contractedHours,
      arms_total_cases: 0,
      t2a_workload_points_id: t2aWorkloadPointsId
    })
}

const knexConfig = require().development
const knex = require('knex')(knexConfig)
const moment = require('moment')

module.exports = function (workloadReportId, totalPoints, workloadPointsId, sdrPoints, paromsPoints, nominalTarget) {
  return knex.insert(
    {
      workload_report_id: workloadReportId,
      workload_points_id: workloadPointsId,
      total_points: totalPoints,
      sdr_points: sdrPoints,
      sdr_conversion_points: 0,
      paroms_points: paromsPoints,
      nominal_target: nominalTarget,
      effective_from: moment.now()
    }).then(function (result) {
      return result.id
    })
}

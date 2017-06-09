const config = require('../../../config')
const knexConfig = require().development
const knex = require('knex')(knexConfig)
const moment = require('moment')

module.exports = function (workloadReportId, totalPoints, workloadPointsId, sdrPoints, paromsPoints, nominalTarget) {
  return knex(`${config.DB_APP_SCHEMA}.workload_points_calculations`).insert({
    workload_report_id: workloadReportId,
    workload_points_id: workloadPointsId,
    total_points: totalPoints,
    sdr_points: sdrPoints,
    sdr_conversion_points: 0,
    paroms_points: paromsPoints,
    nominal_target: nominalTarget,
    effect_from: moment.now()
  })
    .returning('id')
}

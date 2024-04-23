const knex = require('../../../knex').appSchema
const logger = require('../log')

module.exports = function (courtReportCalculation) {
  logger.info('crc ' + courtReportCalculation)
  const dbObject = mapToDbObject(courtReportCalculation)
  logger.info('dbObject ' + dbObject)
  return knex('court_reports_calculations')
    .withSchema('app')
    .returning('id')
    .insert(dbObject).then(function (results) {
      return results.map((result) => result.id)
    })
}

const mapToDbObject = function (courtReportCalculation) {
  return {
    workload_report_id: courtReportCalculation.workloadReportId,
    workload_points_id: courtReportCalculation.workloadPointsId,
    court_reports_id: courtReportCalculation.courtReportsId,
    contracted_hours: courtReportCalculation.contractedHours,
    reduction_hours: courtReportCalculation.reductionHours
  }
}

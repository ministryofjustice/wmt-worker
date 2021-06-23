const knex = require('../../../knex').appSchema

module.exports = function (courtReportsCalculation) {
  const dbObject = mapToDbObject(courtReportsCalculation)

  return knex('court_reports_calculations')
    .withSchema('app')
    .where('workload_report_id', dbObject.workload_report_id)
    .where('court_reports_id', dbObject.court_reports_id)
    .returning('id')
    .update(dbObject)
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

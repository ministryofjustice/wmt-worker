const knex = require('../../../knex').appSchema

module.exports = function (courtReports) {
  const courtReportsDbObject = mapToDbObject(courtReports)

  return knex('court_reports')
    .withSchema('app')
    .insert(courtReportsDbObject)
    .returning('id').then(function (results) {
      return results.map((result) => result.id)
    })
}

const mapToDbObject = function (courtReports) {
  return {
    workload_owner_id: courtReports.workloadOwnerId,
    workload_report_id: courtReports.workloadReportId,
    staging_id: courtReports.stagingId,
    total_sdrs: courtReports.totalSdrs,
    total_fdrs: courtReports.totalFdrs,
    total_oral_reports: courtReports.totalOralReports
  }
}

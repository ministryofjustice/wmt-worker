var tableName = 'court_reports_workload_points_calculation'

exports.seed = function (knex, Promise) {
  var existingCrReportIds
  var currentCrPointsId
    // Deletes ALL existing entries
  return knex(tableName).del()
    .then(function () {
      return knex('workload_report').select('id')
    })
    .then(function (reportIds) {
      existingCrReportIds = reportIds
      return knex('court_reports_workload_points').select('id').first()
    })
    .then(function (crWorkloadPointsId) {
      currentCrPointsId = crWorkloadPointsId
      return knex('workload_owner')
        .join('court_reports_workload', 'workload_owner.id', 'court_reports_workload.workload_owner_id')
        .max('court_reports_workload.id AS id')
        .groupBy('workload_owner.id')
    })
    .then(function (crWorkloadIds) {
      var effectiveFromDate = new Date()
      effectiveFromDate.setDate(effectiveFromDate.getDate() - 365)
        // Inserts seed entries

      var crWorkloadPointsCalculationsToInsert = []

      for (var wr = 0; wr < existingCrReportIds.length; wr++) {
        for (var w = 0; w < crWorkloadIds.length; w++) {
          var crReportId = existingCrReportIds[wr]
          var crWorkloadId = crWorkloadIds[w]

          crWorkloadPointsCalculationsToInsert.push({
            court_reports_workload_id: crWorkloadId.id,
            workload_report_id: crReportId.id,
            court_reports_workload_points_id: currentCrPointsId.id,
            contracted_hours: 37.5,
            reduction_hours: Math.floor(Math.random() * 6) + 1
          })
        }
      }

      return knex(tableName).insert(crWorkloadPointsCalculationsToInsert)
    })
}

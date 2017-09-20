var tableName = 'workload_points_calculations'

exports.seed = function (knex, Promise) {
  var existingReportIds
  var currentPointsId
    // Deletes ALL existing entries
  return knex(tableName).del()
    .then(function () {
      return knex('workload_report').select('id')
    })
    .then(function (reportIds) {
      existingReportIds = reportIds
      return knex('workload_points').select('id').first()
    })
    .then(function (workloadPointsId) {
      currentPointsId = workloadPointsId
      return knex('workload_owner')
        .join('workload', 'workload_owner.id', 'workload.workload_owner_id')
        .max('workload.id AS id')
        .groupBy('workload_owner.id')
    })
    .then(function (workloadIds) {
      var effectiveFromDate = new Date()
      effectiveFromDate.setDate(effectiveFromDate.getDate() - 365)
        // Inserts seed entries

      var workloadPointsCalculationsToInsert = []

      for (var wr = existingReportIds.length - 2; wr < existingReportIds.length; wr++) {
        for (var w = 0; w < workloadIds.length; w++) {
          var reportId = existingReportIds[wr]
          var workloadId = workloadIds[w]

          workloadPointsCalculationsToInsert.push({
            workload_id: workloadId.id,
            workload_report_id: reportId.id,
            workload_points_id: currentPointsId.id,
            total_points: Math.floor(Math.random() * 25) + 180,
            available_points: 190,
            paroms_points: 50,
            sdr_conversion_points: 50,
            sdr_points: 50,
            nominal_target: 0,
            contracted_hours: 37.5,
            reduction_hours: Math.floor(Math.random() * 6) + 1
          })
        }
      }

      return knex(tableName).insert(workloadPointsCalculationsToInsert)
    })
}

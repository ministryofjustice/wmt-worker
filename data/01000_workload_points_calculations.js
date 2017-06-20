var tableName = 'workload_points_calculations'

exports.seed = function (knex, Promise) {
  var existingReportId
  var currentPointsId
    // Deletes ALL existing entries
  return knex(tableName).del()
    .then(function () {
      return knex('workload_report').select('id').first()
    })
    .then(function (reportId) {
      existingReportId = reportId
      return knex('workload_points').select('id').first()
    })
    .then(function (workloadPointsId) {
      currentPointsId = workloadPointsId
      return knex('workload').select('id')
    })
    .then(function (workloadIds) {
      var effectiveFromDate = new Date()
      effectiveFromDate.setDate(effectiveFromDate.getDate() - 365)
        // Inserts seed entries
      return Promise.each(workloadIds, function (workloadId) {
        effectiveFromDate.setDate(effectiveFromDate.getDate() + 30)
        return knex(tableName).insert([
              { workload_id: workloadId.id, workload_report_id: existingReportId.id, workload_points_id: currentPointsId.id, effective_from: effectiveFromDate, effective_to: effectiveFromDate.getDate() + 30, total_points: Math.floor(Math.random() * 25) + 30, available_points: 190, paroms_points: 50, sdr_conversion_points: 50, sdr_points: 50, nominal_target: 0, reduction_hours: Math.floor(Math.random() * 6) + 1 }
        ])
      })
    })
}

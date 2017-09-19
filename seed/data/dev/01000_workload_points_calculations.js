var tableName = 'workload_points_calculations'

exports.seed = function (knex, Promise) {
  var existingReportIds
  var currentPointsId
  var partOneWorkloadPointsCalculations = []
  var partTwoWorkloadPointsCalculations = []
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
      return knex('workload').select('id')
    })
    .then(function (workloadIds) {
      var effectiveFromDate = new Date()
      effectiveFromDate.setDate(effectiveFromDate.getDate() - 365)
        // Inserts seed entries

      var workloadPointsCalculationsToInsert = []
      for (var i = 0; i < workloadIds.length; i++) {
        var reportId = existingReportIds[i % existingReportIds.length]
        var workloadId = workloadIds[i]

        workloadPointsCalculationsToInsert.push({
          workload_id: workloadId.id,
          workload_report_id: reportId.id,
          workload_points_id: currentPointsId.id,
          effective_from: effectiveFromDate,
          effective_to: effectiveFromDate.getDate() + 30,
          total_points: Math.floor(Math.random() * 25) + 180,
          available_points: 190,
          paroms_points: 50,
          sdr_conversion_points: 50,
          sdr_points: 50,
          nominal_target: 0,
          contracted_hours: 37.5,
          reduction_hours: Math.floor(Math.random() * 6) + 1,
          cms_reduction_hours: 0.5 * (Math.floor(Math.random() + 1) - 1)
        })

        effectiveFromDate.setDate(effectiveFromDate.getDate() + 30)
      }
      partOneWorkloadPointsCalculations = workloadPointsCalculationsToInsert.slice(0, workloadPointsCalculationsToInsert.length / 2)
      partTwoWorkloadPointsCalculations = workloadPointsCalculationsToInsert.slice(workloadPointsCalculationsToInsert.length / 2, workloadPointsCalculationsToInsert.length - 1)

      return knex(tableName).insert(partOneWorkloadPointsCalculations)
        .then(function (results) {
          return knex(tableName).insert(partTwoWorkloadPointsCalculations)
        })
    })
}

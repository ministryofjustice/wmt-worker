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
      return knex('workload').select('id')
    })
    .then(function (workloadIds) {
      var effectiveFromDate = new Date()
      effectiveFromDate.setDate(effectiveFromDate.getDate() - 365)
        // Inserts seed entries

      var workloadPointsCalculationsToInsert = []
      
      for (var wr = existingReportIds.length - 2; wr < existingReportIds.length; wr ++) {
        for (var w = 0; w < workloadIds.length; w++) {
          var reportId = existingReportIds[wr % existingReportIds.length]
          var workloadId = workloadIds[w]
  
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
            reduction_hours: Math.floor(Math.random() * 6) + 1
          })
  
          effectiveFromDate.setDate(effectiveFromDate.getDate() + 30)
        }
      }

      console.log(workloadPointsCalculationsToInsert.length)

      var splitSize = workloadPointsCalculationsToInsert.length / 3
      
      var partOneWpc = workloadPointsCalculationsToInsert.slice(0, splitSize)
      var partTwoWpc = workloadPointsCalculationsToInsert.slice(splitSize, splitSize * 2)
      var partThreeWpc = workloadPointsCalculationsToInsert.slice(splitSize * 2, splitSize * 3)
      var partFourWpc = workloadPointsCalculationsToInsert.slice(splitSize * 3, workloadPointsCalculationsToInsert.length - 1)

      return knex(tableName).insert(partOneWpc)
        .then(function (results) {
          return knex(tableName).insert(partTwoWpc)
          .then(function (results) {
            return knex(tableName).insert(partThreeWpc)
            .then(function (results) {
              return knex(tableName).insert(partFourWpc)
            })
          })
        })
    })
}

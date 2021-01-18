const tableName = 'workload_points_calculations'

exports.seed = function (knex, Promise) {
  let existingReportIds
  let currentPointsId
  let currentT2aPointsId
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
      return knex('workload_points').select('id').first().where('is_t2a', true)
    })
    .then(function (t2aWorkloadPintsId) {
      currentT2aPointsId = t2aWorkloadPintsId
      return knex('workload_owner')
        .join('workload', 'workload_owner.id', 'workload.workload_owner_id')
        .max('workload.id AS id')
        .groupBy('workload_owner.id')
    })
    .then(function (workloadIds) {
      const effectiveFromDate = new Date()
      effectiveFromDate.setDate(effectiveFromDate.getDate() - 365)
      // Inserts seed entries

      const workloadPointsCalculationsToInsert = []

      for (let wr = 0; wr < existingReportIds.length; wr++) {
        for (let w = 0; w < workloadIds.length; w++) {
          const reportId = existingReportIds[wr]
          const workloadId = workloadIds[w]

          workloadPointsCalculationsToInsert.push({
            workload_id: workloadId.id,
            workload_report_id: reportId.id,
            workload_points_id: currentPointsId.id,
            t2a_workload_points_id: currentT2aPointsId.id,
            total_points: Math.floor(Math.random() * 25) + 200,
            available_points: 190,
            paroms_points: 50,
            sdr_conversion_points: 50,
            sdr_points: 50,
            nominal_target: 0,
            contracted_hours: 37.5,
            reduction_hours: Math.floor(Math.random() * 6) + 1,
            cms_adjustment_points: 15 * (Math.random() < 0.5 ? 1 : -1),
            gs_adjustment_points: -2
          })
        }
      }

      const splitValue = workloadPointsCalculationsToInsert.length / 2
      const partOneWpcs = workloadPointsCalculationsToInsert.slice(0, splitValue)
      const partTwoWpcs = workloadPointsCalculationsToInsert.slice(splitValue, workloadPointsCalculationsToInsert.length)
      return knex('workload_points_calculations').insert(partOneWpcs)
        .then(function (results) {
          return knex('workload_points_calculations').insert(partTwoWpcs)
        })
    })
}

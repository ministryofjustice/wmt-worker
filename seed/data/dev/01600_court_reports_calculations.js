const tableName = 'court_reports_calculations'

exports.seed = function (knex, Promise) {
  let existingCrReportIds
  let currentCrPointsId
  // Deletes ALL existing entries
  return knex(tableName).withSchema('app').del()
    .then(function () {
      return knex('workload_report').withSchema('app').select('id')
    })
    .then(function (reportIds) {
      existingCrReportIds = reportIds
      return knex('workload_points').withSchema('app').select('id').first()
    })
    .then(function (crWorkloadPointsId) {
      currentCrPointsId = crWorkloadPointsId
      return knex('workload_owner')
        .withSchema('app')
        .join('court_reports', 'workload_owner.id', 'court_reports.workload_owner_id')
        .max('court_reports.id AS id')
        .groupBy('workload_owner.id')
    })
    .then(function (crWorkloadIds) {
      const effectiveFromDate = new Date()
      effectiveFromDate.setDate(effectiveFromDate.getDate() - 365)
      // Inserts seed entries

      const crWorkloadPointsCalculationsToInsert = []

      for (let wr = 0; wr < existingCrReportIds.length; wr++) {
        for (let w = 0; w < crWorkloadIds.length; w++) {
          const crReportId = existingCrReportIds[wr]
          const crWorkloadId = crWorkloadIds[w]

          crWorkloadPointsCalculationsToInsert.push({
            court_reports_id: crWorkloadId.id,
            workload_report_id: crReportId.id,
            workload_points_id: currentCrPointsId.id,
            contracted_hours: 37.5,
            reduction_hours: Math.floor(Math.random() * 6) + 1
          })
        }
      }

      return knex(tableName).withSchema('app').insert(crWorkloadPointsCalculationsToInsert)
    })
}

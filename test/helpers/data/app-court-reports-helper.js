const knex = require('../../../knex').appSchema
const workloadOwnerHelper = require('./app-workload-owner-helper')

module.exports.insertDependencies = function (inserts) {
  const workloadReports = [
    { effective_from: '2017-02-01' }
  ]

  return knex('workload_report').withSchema('app').returning('id').insert(workloadReports)
    .then(function ([workloadReportId]) {
      inserts.push({ table: 'workload_report', id: workloadReportId.id })
      return workloadOwnerHelper.insertDependencies(inserts)
        .then(function (inserts) {
          const newCourtReport = {
            workload_report_id: workloadReportId.id,
            staging_id: 999,
            workload_owner_id: inserts.filter((item) => item.table === 'workload_owner')[0].id,
            total_sdrs: 1,
            total_fdrs: 2,
            total_oral_reports: 3
          }
          return knex('court_reports').withSchema('app').returning('id').insert(newCourtReport)
            .then(function ([ids]) {
              inserts.push({ table: 'court_reports', id: ids.id })
              return inserts
            })
        })
    })
}

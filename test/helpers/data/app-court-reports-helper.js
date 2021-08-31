const knex = require('../../../knex').appSchema
const workloadOwnerHelper = require('./app-workload-owner-helper')

module.exports.insertDependencies = function (inserts) {
  const workloadReports = [
    { effective_from: '2017-02-01' }
  ]

  return knex('workload_report').withSchema('app').returning('id').insert(workloadReports)
    .then(function (workloadReportId) {
      inserts.push({ table: 'workload_report', id: workloadReportId[0] })
      return workloadOwnerHelper.insertDependencies(inserts)
        .then(function (inserts) {
          const newCourtReport = {
            workload_report_id: workloadReportId[0],
            staging_id: 999,
            workload_owner_id: inserts.filter((item) => item.table === 'workload_owner')[0].id,
            total_sdrs: 1,
            total_fdrs: 2,
            total_oral_reports: 3
          }
          return knex('court_reports').withSchema('app').returning('id').insert(newCourtReport)
            .then(function (ids) {
              inserts.push({ table: 'court_reports', id: ids[0] })
              return inserts
            })
        })
    })
}

module.exports.removeDependencies = function (inserts) {
  inserts = inserts.reverse()
  return inserts.map((deletion) => {
    return knex(deletion.table).withSchema('app').whereIn('id', [deletion.id]).del()
  }).reduce(function (prev, current) {
    return prev.then(function () {
      return current
    })
  }, Promise.resolve())
}

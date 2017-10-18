const knex = require('../../../knex').appSchema
const Promise = require('bluebird').Promise
const appReductionsHelper = require('./app-reductions-helper')

module.exports.insertDependencies = function (inserts) {
  return appReductionsHelper.insertDependencies(inserts)
  .then(function (inserts) {
    var workloadOwnerId = inserts.filter((item) => item.table === 'workload_owner')[0].id
    var workloadReportId = inserts.filter((item) => item.table === 'workload_report')[0].id

    var defaultCourtReport = {
      workload_owner_id: workloadOwnerId,
      workload_report_id: workloadReportId,
      staging_id: 1,
      total_sdrs: 5,
      total_fdrs: 6,
      total_oral_reports: 7
    }

    return knex('court_reports').returning('id').insert(defaultCourtReport)
    .then(function (ids) {
      inserts.push({ table: 'court_reports', id: ids[0] })
      return inserts
    })
  })
}

module.exports.removeDependencies = function (inserts) {
  inserts = inserts.reverse()
  return Promise.each(inserts, (insert) => {
    return knex(insert.table).where('id', insert.id).del()
  })
}

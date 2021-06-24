const knex = require('../../../knex').appSchema
const Promise = require('bluebird').Promise
const workloadOwnerHelper = require('./app-workload-owner-helper')

module.exports.insertDependencies = function (inserts) {
  return knex('court_reports_calculations').withSchema('app').first('id')
    .then(function (crcCalculationId) {
      return knex('workload_report').withSchema('app').whereNull('effective_to').first('id')
        .then(function (workloadReportId) {
          return knex('court_reports').withSchema('app').max('staging_id AS maxId')
            .then(function (maxStagingId) {
              return workloadOwnerHelper.insertDependencies(inserts)
                .then(function (inserts) {
                  const newCourtReport = {
                    workload_report_id: workloadReportId.id,
                    staging_id: maxStagingId[0].maxId + 1,
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
        })
    })
}

module.exports.removeDependencies = function (inserts) {
  inserts = inserts.reverse()
  return Promise.each(inserts, (insert) => {
    return knex(insert.table).withSchema('app').where('id', insert.id).del()
  })
}

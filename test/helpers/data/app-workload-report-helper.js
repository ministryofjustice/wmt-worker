const knex = require('../../../knex').appSchema
const workloadReportStatus = require('../../../app/constants/workload-report-status')

module.exports.insertDependencies = function (inserts) {
  return knex('workload_report').withSchema('app').returning('id').insert({ status: workloadReportStatus.INPROGRESS })
    .then(function ([ids]) {
      inserts.push({ table: 'workload_report', id: ids.id })
      return inserts
    })
}

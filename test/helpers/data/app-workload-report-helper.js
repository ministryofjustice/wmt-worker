const knex = require('../../../knex').appSchema
const Promise = require('bluebird').Promise
const workloadReportStatus = require('../../../app/constants/workload-report-status')

module.exports.insertDependencies = function (inserts) {
  return knex('workload_report').withSchema('app').returning('id').insert({ status: workloadReportStatus.INPROGRESS })
    .then(function (ids) {
      inserts.push({ table: 'workload_report', id: ids[0] })
      return inserts
    })
    .catch((error) => {
      console.error(error)
      exports.removeDependencies(inserts)
    })
}

module.exports.removeDependencies = function (inserts) {
  inserts = inserts.reverse()
  return Promise.each(inserts, (deletion) => {
    return knex(deletion.table).withSchema('app').whereIn('id', [deletion.id]).del()
  })
}

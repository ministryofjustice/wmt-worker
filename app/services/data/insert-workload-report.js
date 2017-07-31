const knexConfig = require('../../../knexfile').app
const knex = require('knex')(knexConfig)
const workloadReportStatus = require('../../constants/workload-report-status')

module.exports = function () {
  const workloadReport = getDefaultWorkloadReport()
  return knex(`workload_report`)
    .insert(workloadReport)
    .returning('id')
    .then(function (ids) {
      return ids[0]
    })
}

function getDefaultWorkloadReport () {
  return {
    status: workloadReportStatus.INPROGRESS
  }
}

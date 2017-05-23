const config = require('../../../config')
const knexConfig = require('../../../knexfile').development
const knex = require('knex')(knexConfig)
const workloadReportStatus = require('../../constants/workload-report-status')

module.exports = function () {
  const workloadReport = getDefaultWorkloadReport()
  return knex(`${config.DB_APP_SCHEMA}.workload_report`)
    .insert(workloadReport)
    .returning('id')
}

function getDefaultWorkloadReport () {
  return {
    status: workloadReportStatus.PENDING
  }
}

const knexConfig = require('../../../knexfile').development
const knex = require('knex')(knexConfig)
const CaseDetails = require('wmt-probation-rules').CaseDetails
const OmWorkload = require('wmt-probation-rules').OmWorkload

module.exports = function (initialId, batchSize) {
  var maxId = initialId + batchSize
  var workloadReports = []


  return knex.select().from('workload')
    .join('community_tiers', 'workload_id', 'workload.id')
    .join('licenser_tiers', 'workload_id', 'workload.id')
    .join('custody_tiers', 'workload_id', 'workload.id')
    .whereBetween('id', [initialId, maxId])
    .then(function (results) {
      var filteredResults = []
      var casedetails = []
      for (let i = initialId; i <= maxId; i++) {
        filteredResults = results.filter(getByWorkloadId(i))
        for (var result in filteredResults) {
          casedetails.push(new CaseDetails(
              result.row_type,
              result.case_ref_no,
              result.tier_code,
              result.team_code,
              result.om_grade_code,
              result.om_key,
              result.location,
              result.workloadId
            ))
        }
        workloadReports.push(new OmWorkload(undefined, undefined, undefined, casedetails, i))
      }
      return workloadReports
    })
}

var getByWorkloadId = function (workloadId) {
  return function (element) {
    return element.workloadId === workloadId
  }
}

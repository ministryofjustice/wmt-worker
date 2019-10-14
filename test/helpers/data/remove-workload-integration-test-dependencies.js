const knexStaging = require('../../../knex').stagingSchema
const knexApp = require('../../../knex').appSchema
const deleteStagingRecords = require('./delete-staging-records')
var stagingIds = []
var workloadIds = []
var workloadOwnerIds = []
var teamIds = []
var omIds = []
var lduIds = []
var regionIds = []
module.exports = function () {
  return knexStaging('wmt_extract').select('id')
    .then(function (stagingIdsReturned) {
      stagingIdsReturned.forEach(function (id) {
        stagingIds.push(id['id'])
      })
      return knexApp('workload').whereIn('staging_id', stagingIds).columns(['id', 'workload_owner_id'])
    })
    .then(function (workloadsReturned) {
      workloadsReturned.forEach(function (workload) {
        workloadIds.push(workload['id'])
        workloadOwnerIds.push(workload['workload_owner_id'])
      })
      return knexApp('workload_owner').whereIn('id', workloadOwnerIds)
    })
    .then(function (workloadOwnersReturned) {
      workloadOwnersReturned.forEach(function (workloadOwner) {
        omIds.push(workloadOwner['offender_manager_id'])
        teamIds.push(workloadOwner['team_id'])
      })
      return knexApp('team').whereIn('id', teamIds)
    })
    .then(function (teamsReturned) {
      teamsReturned.forEach(function (team) {
        lduIds.push(team['ldu_id'])
      })
      return knexApp('ldu').whereIn('id', lduIds)
    })
    .then(function (ldusReturned) {
      ldusReturned.forEach(function (ldu) {
        regionIds.push(ldu['region_id'])
      })
      return knexApp('tiers').whereIn('workload_id', workloadIds).del()
    })
    .then(function () { return knexApp('case_details').whereIn('workload_id', workloadIds).del() })
    .then(function () { return knexApp('workload').whereIn('id', workloadIds).del() })
    .then(function () { return knexApp('workload_owner').whereIn('id', workloadOwnerIds).del() })
    .then(function () { return knexApp('offender_manager').whereIn('id', omIds).del() })
    .then(function () { return knexApp('team').whereIn('id', teamIds).del() })
    .then(function () { return knexApp('ldu').whereIn('id', lduIds).del() })
    .then(function () { return knexApp('region').whereIn('id', regionIds).del() })
    .then(function () { return deleteStagingRecords() })
}
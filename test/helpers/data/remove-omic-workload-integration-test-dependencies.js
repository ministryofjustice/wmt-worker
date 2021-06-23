const knexStaging = require('../../../knex').stagingSchema
const knexApp = require('../../../knex').appSchema
const deleteStagingOmicRecords = require('./delete-staging-omic-records')
const stagingIds = []
const workloadIds = []
const workloadOwnerIds = []
const teamIds = []
const omIds = []
const lduIds = []
const regionIds = []
module.exports = function () {
  return knexStaging('omic_teams').withSchema('staging').select('id')
    .then(function (stagingIdsReturned) {
      stagingIdsReturned.forEach(function (id) {
        stagingIds.push(id.id)
      })
      return knexApp('omic_workload').withSchema('app').whereIn('staging_id', stagingIds).columns(['id', 'workload_owner_id'])
    })
    .then(function (workloadsReturned) {
      workloadsReturned.forEach(function (workload) {
        workloadIds.push(workload.id)
        workloadOwnerIds.push(workload.workload_owner_id)
      })
      return knexApp('workload_owner').withSchema('app').whereIn('id', workloadOwnerIds)
    })
    .then(function (workloadOwnersReturned) {
      workloadOwnersReturned.forEach(function (workloadOwner) {
        omIds.push(workloadOwner.offender_manager_id)
        teamIds.push(workloadOwner.team_id)
      })
      return knexApp('team').withSchema('app').whereIn('id', teamIds)
    })
    .then(function (teamsReturned) {
      teamsReturned.forEach(function (team) {
        lduIds.push(team.ldu_id)
      })
      return knexApp('ldu').withSchema('app').whereIn('id', lduIds)
    })
    .then(function (ldusReturned) {
      ldusReturned.forEach(function (ldu) {
        regionIds.push(ldu.region_id)
      })
      return knexApp('omic_tiers').withSchema('app').whereIn('omic_workload_id', workloadIds).del()
    })
    .then(function () { return knexApp('omic_case_details').withSchema('app').whereIn('omic_workload_id', workloadIds).del() })
    .then(function () { return knexApp('omic_workload').withSchema('app').whereIn('id', workloadIds).del() })
    .then(function () { return knexApp('workload_owner').withSchema('app').whereIn('id', workloadOwnerIds).del() })
    .then(function () { return knexApp('offender_manager').withSchema('app').whereIn('id', omIds).del() })
    .then(function () { return knexApp('team').withSchema('app').whereIn('id', teamIds).del() })
    .then(function () { return knexApp('ldu').withSchema('app').whereIn('id', lduIds).del() })
    .then(function () { return knexApp('region').withSchema('app').whereIn('id', regionIds).del() })
    .then(function () { return deleteStagingOmicRecords() })
}

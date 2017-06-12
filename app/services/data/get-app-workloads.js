const knexConfig = require('../../../knexfile').development
const knex = require('knex')(knexConfig)
const TierCounts = require('wmt-probation-rules').TierCounts
const Tiers = require('wmt-probation-rules').Tiers
const Workload = require('wmt-probation-rules').Workload
const Locations = require('wmt-probation-rules').Locations

module.exports = function (initialId, batchSize) {
  var maxId = initialId + batchSize

  return knex('workload').withSchema('app').leftJoin('tiers', 'workload.id', 'workload_id')
        .whereBetween('workload.id', [initialId, maxId])
        .select('workload.id',
                'workload.workload_owner_id',
                'workload.total_cases',
                'workload.total_custody_cases',
                'workload.total_community_cases',
                'workload.total_license_cases',
                'workload.monthly_sdrs',
                'workload.sdr_due_next_30_days',
                'workload.paroms_due_next_30_days',
                'workload.paroms_completed_last_30_days',
                'tiers.total_cases as tiers_total_cases',
                'tiers.warrants_total',
                'tiers.unpaid_work_total',
                'tiers.overdue_terminations_total',
                'tiers.location',
                'tiers.tier_number'
               )
        .then(function (workloadResults) {
          var tempWorkloads = new Array(batchSize)

          workloadResults.forEach(function (row) {
            var index = row.id - initialId
            if (tempWorkloads[index] === undefined) {
              tempWorkloads[index] = {
                community: new Array(8),
                license: new Array(8),
                custody: new Array(8)
              }
              tempWorkloads[index].workloadOwnerId = row.workload_owner_id
              tempWorkloads[index].totalCases = row.total_cases
              tempWorkloads[index].totalCustodyCases = row.total_custody_cases
              tempWorkloads[index].totalCommunityCases = row.total_community_cases
              tempWorkloads[index].totalLicenseCases = row.total_license_cases
              tempWorkloads[index].paromsCompletedLast30Days = row.paroms_completed_last_30_days
              tempWorkloads[index].paromsDueNext30Days = row.paroms_due_next_30_days
              tempWorkloads[index].monthlySdrs = row.monthly_sdrs
              tempWorkloads[index].sdrsDueNext30Days = row.sdr_due_next_30_days
            }

            tempWorkloads[index][row.location][row.tier_number] = new TierCounts(
                            row.tiers_total_cases,
                            row.warrants_total,
                            row.unpaid_work_total,
                            row.overdue_terminations_total)
          })

          var workloads = []
          tempWorkloads.forEach(function(tempWorkload) {
            workloads.push(
              new Workload(
                tempWorkload.workloadOwnerId,
                tempWorkload.totalCases,
                tempWorkload.monthlySdrs,
                tempWorkload.sdrsDueNext30Days,
                tempWorkload.paromsCompletedLast30Days,
                tempWorkload.paromsDueNext30Days,
                new Tiers(Locations.CUSTODY, ...tempWorkload[Locations.CUSTODY], tempWorkload.totalCustodyCases),
                new Tiers(Locations.COMMUNITY, ...tempWorkload[Locations.COMMUNITY], tempWorkload.totalCommunityCases),
                new Tiers(Locations.LICENSE, ...tempWorkload[Locations.LICENSE], tempWorkload.totalLicenseCases)
              )
            )
          })
          return workloads
        })
}

const knex = require('../../../knex').appSchema
const TierCounts = require('wmt-probation-rules').TierCounts
const Tiers = require('wmt-probation-rules').AppTiers
const Workload = require('wmt-probation-rules').Workload
const Locations = require('wmt-probation-rules').Locations

module.exports = function (initialId, maxId, batchSize, workloadReportId) {
  return knex('workload').withSchema('app')
      .leftJoin('tiers', 'workload.id', 'workload_id')
      .leftJoin('workload_owner', 'workload.workload_owner_id', 'workload_owner.id')
      .leftJoin('offender_manager', 'workload_owner.offender_manager_id', 'offender_manager.id')
      .whereBetween('workload.staging_id', [initialId, maxId])
      .andWhere('workload.workload_report_id', workloadReportId)
      .select('workload.id',
              'workload.staging_id',
              'workload.workload_owner_id',
              'workload.total_cases',
              'workload.total_t2a_cases',
              'workload.total_custody_cases',
              'workload.total_community_cases',
              'workload.total_license_cases',
              'workload.total_t2a_custody_cases',
              'workload.total_t2a_community_cases',
              'workload.total_t2a_license_cases',
              'workload.monthly_sdrs',
              'workload.sdr_conversions_last_30_days',
              'workload.sdr_due_next_30_days',
              'workload.paroms_due_next_30_days',
              'workload.paroms_completed_last_30_days',
              'workload.license_last_16_weeks',
              'workload.arms_community_cases',
              'workload.arms_license_cases',
              'workload.community_last_16_weeks',
              'tiers.total_cases as tiers_total_cases',
              'tiers.warrants_total',
              'tiers.unpaid_work_total',
              'tiers.overdue_terminations_total',
              'tiers.t2a_total_cases AS t2a_tiers_total_cases',
              'tiers.t2a_warrants_total',
              'tiers.t2a_unpaid_work_total',
              'tiers.t2a_overdue_terminations_total',
              'tiers.suspended_total',
              'tiers.location',
              'tiers.tier_number'
              )
      .then(function (workloadResults) {
        var tempWorkloads = new Array(batchSize)

        workloadResults.forEach(function (row) {
          var index
          if (batchSize > 1) {
            index = row.id - initialId
          } else {
            index = 0
          }
          if (tempWorkloads[index] === undefined) {
            tempWorkloads[index] = {
              COMMUNITY: new Array(8),
              LICENSE: new Array(8),
              CUSTODY: new Array(8)
            }
            tempWorkloads[index].T2A = {
              COMMUNITY: new Array(8),
              LICENSE: new Array(8),
              CUSTODY: new Array(8)
            }
            tempWorkloads[index].id = row.id
            tempWorkloads[index].stagingId = row.staging_id
            tempWorkloads[index].workloadReportId = workloadReportId
            tempWorkloads[index].workloadOwnerId = row.workload_owner_id
            tempWorkloads[index].totalCases = row.total_cases
            tempWorkloads[index].totalCustodyCases = row.total_custody_cases
            tempWorkloads[index].totalCommunityCases = row.total_community_cases
            tempWorkloads[index].totalLicenseCases = row.total_license_cases
            tempWorkloads[index].totalT2aCases = row.total_t2a_cases
            tempWorkloads[index].totalT2aCustodyCases = row.total_t2a_custody_cases
            tempWorkloads[index].totalT2aCommunityCases = row.total_t2a_community_cases
            tempWorkloads[index].totalT2aLicenseCases = row.total_t2a_license_cases
            tempWorkloads[index].paromsCompletedLast30Days = row.paroms_completed_last_30_days
            tempWorkloads[index].paromsDueNext30Days = row.paroms_due_next_30_days
            tempWorkloads[index].monthlySdrs = row.monthly_sdrs
            tempWorkloads[index].sdrConversionsLast30Days = row.sdr_conversions_last_30_days
            tempWorkloads[index].sdrsDueNext30Days = row.sdr_due_next_30_days
            tempWorkloads[index].communityCasesLast16Weeks = row.community_last_16_weeks
            tempWorkloads[index].licenseCasesLast16Weeks = row.license_last_16_weeks
            tempWorkloads[index].armsCommunityCases = row.arms_community_cases
            tempWorkloads[index].armsLicenseCases = row.arms_license_cases
          }

          tempWorkloads[index][row.location][row.tier_number] = new TierCounts(
                          row.tiers_total_cases,
                          row.warrants_total,
                          row.unpaid_work_total,
                          row.overdue_terminations_total,
                          row.suspended_total)

          tempWorkloads[index].T2A[row.location][row.tier_number] = new TierCounts(
                            row.t2a_tiers_total_cases,
                            row.t2a_warrants_total,
                            row.t2a_unpaid_work_total,
                            row.t2a_overdue_terminations_total,
                            row.suspended_total)
        })

        var workloads = []
        tempWorkloads.forEach(function (tempWorkload) {
          workloads.push(
            { id: tempWorkload.id,
              values: new Workload(
              tempWorkload.workloadOwnerId,
              tempWorkload.totalCases,
              tempWorkload.totalT2aCases,
              tempWorkload.monthlySdrs,
              tempWorkload.sdrsDueNext30Days,
              tempWorkload.sdrConversionsLast30Days,
              tempWorkload.paromsCompletedLast30Days,
              tempWorkload.paromsDueNext30Days,
              new Tiers(Locations.CUSTODY, ...tempWorkload[Locations.CUSTODY], tempWorkload.totalCustodyCases),
              new Tiers(Locations.COMMUNITY, ...tempWorkload[Locations.COMMUNITY], tempWorkload.totalCommunityCases),
              new Tiers(Locations.LICENSE, ...tempWorkload[Locations.LICENSE], tempWorkload.totalLicenseCases),
              new Tiers(Locations.CUSTODY, ...tempWorkload.T2A[Locations.CUSTODY], tempWorkload.totalT2aCustodyCases),
              new Tiers(Locations.COMMUNITY, ...tempWorkload.T2A[Locations.COMMUNITY], tempWorkload.totalT2aCommunityCases),
              new Tiers(Locations.LICENSE, ...tempWorkload.T2A[Locations.LICENSE], tempWorkload.totalT2aLicenseCases),
              tempWorkload.licenseCasesLast16Weeks,
              tempWorkload.communityCasesLast16Weeks,
              tempWorkload.armsCommunityCases,
              tempWorkload.armsLicenseCases,
              tempWorkload.stagingId,
              tempWorkload.workloadReportId
            )
            }
          )
        })
        return workloads
      })
}

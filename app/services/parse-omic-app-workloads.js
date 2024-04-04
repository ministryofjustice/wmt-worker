const getOmicAppWorkloads = require('./data/get-omic-app-workloads')
const TierCounts = require('./probation-rules').TierCounts
const Tiers = require('./probation-rules').AppTiers
const Workload = require('./probation-rules').Workload
const Locations = require('./probation-rules').Locations

module.exports = function (initialId, maxId, batchSize, workloadReportId) {
  return getOmicAppWorkloads(initialId, maxId, workloadReportId)
    .then(function (workloadResults) {
      const tempWorkloads = new Array(batchSize)

      workloadResults.forEach(function (row) {
        let index
        if (batchSize > 1) {
          index = row.staging_id - initialId
        } else {
          index = 0
        }
        if (tempWorkloads[index] === undefined) {
          tempWorkloads[index] = {
            // WMT0229: Increase Size of all Arrays to 17
            COMMUNITY: new Array(33),
            LICENSE: new Array(33),
            CUSTODY: new Array(33)
          }
          tempWorkloads[index].T2A = {
            // WMT0229: Increase Size of all Arrays to 17
            COMMUNITY: new Array(33),
            LICENSE: new Array(33),
            CUSTODY: new Array(33)
          }
          tempWorkloads[index].filtered = {
            // WMT0229: Increase Size of all Arrays to 17
            COMMUNITY: new Array(33),
            LICENSE: new Array(33),
            CUSTODY: new Array(33)
          }
          tempWorkloads[index].id = row.id
          tempWorkloads[index].stagingId = row.staging_id
          tempWorkloads[index].workloadReportId = workloadReportId
          tempWorkloads[index].workloadOwnerId = row.workload_owner_id
          tempWorkloads[index].totalCases = row.total_cases
          tempWorkloads[index].totalCustodyCases = row.total_custody_cases
          tempWorkloads[index].totalCommunityCases = row.total_community_cases
          tempWorkloads[index].totalLicenseCases = row.total_license_cases
          tempWorkloads[index].totalFilteredCases = row.total_filtered_cases
          tempWorkloads[index].totalFilteredCustodyCases = row.total_filtered_custody_cases
          tempWorkloads[index].totalFilteredCommunityCases = row.total_filtered_community_cases
          tempWorkloads[index].totalFilteredLicenseCases = row.total_filtered_license_cases
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
          row.suspended_total,
          row.suspended_lifer_total,
          row.tier_number, false)

        tempWorkloads[index].filtered[row.location][row.tier_number] = new TierCounts(
          row.tiers_total_filtered_cases,
          row.warrants_total,
          row.unpaid_work_total,
          row.overdue_terminations_total,
          row.suspended_total,
          row.suspended_lifer_total,
          row.tier_number, false)

        tempWorkloads[index].T2A[row.location][row.tier_number] = new TierCounts(
          row.t2a_tiers_total_cases,
          row.t2a_warrants_total,
          row.t2a_unpaid_work_total,
          row.t2a_overdue_terminations_total,
          row.suspended_total,
          row.suspended_lifer_total,
          row.tier_number, true)
      })

      const workloads = []
      tempWorkloads.forEach(function (tempWorkload) {
        workloads.push(
          {
            id: tempWorkload.id,
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
              tempWorkload.workloadReportId,
              new Tiers(Locations.COMMUNITY, ...tempWorkload.filtered[Locations.COMMUNITY], tempWorkload.totalFilteredCommunityCases),
              new Tiers(Locations.CUSTODY, ...tempWorkload.filtered[Locations.CUSTODY], tempWorkload.totalFilteredCustodyCases),
              new Tiers(Locations.LICENSE, ...tempWorkload.filtered[Locations.LICENSE], tempWorkload.totalFilteredLicenseCases),
              tempWorkload.totalFilteredCases
            )
          }
        )
      })
      return workloads
    })
}

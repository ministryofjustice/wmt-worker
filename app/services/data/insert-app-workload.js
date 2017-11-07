const knex = require('../../../knex').appSchema
const Locations = require('wmt-probation-rules').Locations

module.exports = function (workload) {
  workload.totalCommunityCases = workload.communityTiers.total
  workload.totalCustodyCases = workload.custodyTiers.total
  workload.totalLicenseCases = workload.licenseTiers.total
  workload.totalT2aCommunityCases = workload.t2aCommunityTiers.total
  workload.totalT2aCustodyCases = workload.t2aCustodyTiers.total
  workload.totalT2aLicenseCases = workload.t2aLicenseTiers.total
  var workloadDbObj = mapForInsert(workload)

  return knex('workload')
    .insert(workloadDbObj)
    .returning('id')
    .then(function (workloadId) {
      var promises = []
      promises.push(insertTiers(workload.communityTiers, workload.t2aCommunityTiers, workloadId, Locations.COMMUNITY))
      promises.push(insertTiers(workload.custodyTiers, workload.t2aCustodyTiers, workloadId, Locations.CUSTODY))
      promises.push(insertTiers(workload.licenseTiers, workload.t2aLicenseTiers, workloadId, Locations.LICENSE))
      return Promise.all(promises).then(function () { return workloadId[0] })
    })
}

const aliases = {
  workloadOwnerId: 'workload_owner_id',
  totalCases: 'total_cases',
  totalT2aCases: 'total_t2a_cases',
  monthlySdrs: 'monthly_sdrs',
  sdrsDueNext30Days: 'sdr_due_next_30_days',
  sdrConversionsLast30Days: 'sdr_conversions_last_30_days',
  paromsCompletedLast30Days: 'paroms_completed_last_30_days',
  paromsDueNext30Days: 'paroms_due_next_30_days',
  totalCommunityCases: 'total_community_cases',
  totalCustodyCases: 'total_custody_cases',
  totalLicenseCases: 'total_license_cases',
  totalT2aCommunityCases: 'total_t2a_community_cases',
  totalT2aCustodyCases: 'total_t2a_custody_cases',
  totalT2aLicenseCases: 'total_t2a_license_cases',
  licenseCasesLast16Weeks: 'license_last_16_weeks',
  communityCasesLast16Weeks: 'community_last_16_weeks',
  armsCommunityCases: 'arms_community_cases',
  armsLicenseCases: 'arms_license_cases',
  stagingId: 'staging_id',
  workloadReportId: 'workload_report_id'
}

var insertTiers = function (tiers, t2aTiers, workloadId, location) {
  var tiersToInsert = []
  var tiersInNumberOrder = tiers.getTiersAsList().reverse()
  var t2aTiersInNumberOrder = t2aTiers.getTiersAsList().reverse()
  for (var i = 0; i < tiersInNumberOrder.length; i++) {
    var currentTier = tiersInNumberOrder[i]
    var currentT2aTier = t2aTiersInNumberOrder[i]
    var tierToInsert = {
      workload_id: workloadId,
      tier_number: i,
      overdue_terminations_total: currentTier.overdueTermination,
      warrants_total: currentTier.warrants,
      unpaid_work_total: currentTier.unpaidWork,
      suspended_total: currentTier.suspended,
      total_cases: currentTier.total,
      t2a_overdue_terminations_total: currentT2aTier.overdueTermination,
      t2a_warrants_total: currentT2aTier.warrants,
      t2a_unpaid_work_total: currentT2aTier.unpaidWork,
      t2a_total_cases: currentT2aTier.total,
      location: location
    }
    tiersToInsert.push(tierToInsert)
  }
  return knex('tiers').insert(tiersToInsert)
}

var mapForInsert = function (record) {
  var row = {}
  for (let key in record) {
    if (typeof aliases[key] !== 'undefined') {
      row[aliases[key]] = record[key]
    }
  }
  return row
}

const knexConfig = require('../../../knexfile').app
const knex = require('knex')(knexConfig)
const Locations = require('wmt-probation-rules').Locations

module.exports = function (workload) {
  workload.totalCommunityCases = workload.communityTiers.total
  workload.totalCustodyCases = workload.custodyTiers.total
  workload.totalLicenseCases = workload.licenseTiers.total
  var workloadDbObj = mapForInsert(workload)

  return knex('workload')
    .insert(workloadDbObj)
    .returning('id')
    .then(function (workloadId) {
        var promises = []
        promises.push(insertTiers(workload.communityTiers, workloadId, Locations.COMMUNITY))
        promises.push(insertTiers(workload.custodyTiers, workloadId, Locations.CUSTODY))
        promises.push(insertTiers(workload.licenseTiers, workloadId, Locations.LICENSE))
        return Promise.all(promises).then(function() { return workloadId })
    })
}

const aliases = {
  workloadOwnerId: 'workload_owner_id',
  totalCases: 'total_cases',
  monthlySdrs: 'monthly_sdrs',
  sdrsDueNext30Days: 'sdr_due_next_30_days',
  sdrConversionsLast30Days: 'sdr_conversions_last_30_days',
  paromsCompletedLast30Days: 'paroms_completed_last_30_days',
  paromsDueNext30Days: 'paroms_due_next_30_days',
  totalCommunityCases: 'total_community_cases',
  totalCustodyCases: 'total_custody_cases',
  totalLicenseCases: 'total_license_cases'
}

var insertTiers = function (tiers, workloadId, location) {
  var tiersToInsert = []
  var tiersInNumberOrder = tiers.getTiersAsList().reverse()
  for (var i = 0; i < tiersInNumberOrder.length; i++) {
    var currentTier = tiersInNumberOrder[i]
    var tierToInsert = {
        workload_id: workloadId,
        tier_number: i,
        overdue_terminations_total: currentTier.overdueTermination,
        warrants_total: currentTier.warrants,
        unpaid_work_total: currentTier.unpaidWork,
        total_cases: currentTier.total,
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

const knexConfig = require('../../../knexfile').development
const knex = require('knex')(knexConfig)
const CaseDetails = require('wmt-probation-rules').CaseDetails
const Workload = require('wmt-probation-rules').Workload
const Locations = require('wmt-probation-rules').Locations
const TierCounts = require('wmt-probation-rules').TierCounts
const Tiers = require('wmt-probation-rules').Tiers

module.exports = function (initialId, batchSize) {
  var maxId = initialId + batchSize
  // var workloadReports = []

  return knex.select().from('workload')
    .whereBetween('id', [initialId, maxId])
    .then(function (workloadResults) {
      var workloads = []
      var filteredResults = []

      return knex.select().from('tiers')
        .whereBetween('workload_id', [initialId, maxId])
        .then(function (tiersResults) {
          var workloadResult = {}
          var communityTier = {}
          var licenseTier = {}
          var custodyTier = {}
          var communityResults = []
          var custodyResults = []
          var licenseResults = []
          var communityTierCountsList = []
          var licenseTierCountsList = []
          var custodyTierCountsList = []
          var communityTiers = {}
          var licenseTiers = {}
          var custodyTiers = {}

          for (let i = initialId; i <= maxId; i++) {
            workloadResult = workloadResults.filter(getById(i))
            filteredResults = tiersResults.filter(getByWorkloadId(i))

            communityResults = filteredResults.filter(getByLocation(Locations.COMMUNITY))
            licenseResults = filteredResults.filter(getByLocation(Locations.LICENSE))
            custodyResults = filteredResults.filter(getByLocation(Locations.CUSTODY))

            for (let x = 0; x <= 7; x++) {
              communityTier = communityResults.filter(getByTierNumber(x))
              licenseTier = licenseResults.filter(getByTierNumber(x))
              custodyTier = custodyResults.filter(getByTierNumber(x))

              communityTierCountsList.push(createTierCounts(communityTier))
              licenseTierCountsList.push(createTierCounts(licenseTier))
              custodyTierCountsList.push(createTierCounts(custodyTier))
            }
            communityTiers = new Tiers(...communityTierCountsList)
            licenseTiers = new Tiers(...licenseTierCountsList)
            custodyTiers = new Tiers(...custodyTierCountsList)

            // Workload Owner and Workload Points Calculations
            workloads.push(new Workload(workloadResult.workloadOwnerId, workloadResult.totalCases,
                                        workloadResult.totalCasesInactive, workloadResult.monthlySdrs,
                                        workloadResult.SdrDueNext30Days, communityTiers, licenseTiers, custodyTiers))
          }

          return workloads
        })
    })
}

var getByWorkloadId = function (workloadId) {
  return function (element) {
    return element.workloadId === workloadId
  }
}

var getByLocation = function (location) {
  return function (element) {
    return element.location === location
  }
}

var getByTierNumber = function (tierNumber) {
  return function (element) {
    return element.tier_number === tierNumber
  }
}

var getById = function (id) {
  return function (element) {
    return element.id === id
  }
}

var createTierCounts = function (tier) {
  var tierCount = new TierCounts(tier.total, tier.warrant_total,
                                 tier.unpaid_work_total, tier.overdue_termination_total)
  return tierCount
}

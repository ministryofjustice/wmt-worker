const TierCounts = require('../points/domain/tier-counts')
const DestinationTier = require('../points/domain/tier')

module.exports = function (caseCount, warrantCount, unpaidWorkCount, overdueTerminationCount, suspendedCount, suspendedLifersCount, tierCode) {
  const tierCounts = new TierCounts(caseCount, warrantCount, unpaidWorkCount, overdueTerminationCount, suspendedCount, suspendedLifersCount, tierCode)
  return new DestinationTier(tierCounts)
}

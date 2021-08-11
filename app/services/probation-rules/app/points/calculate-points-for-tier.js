const TierCounts = require('../../app/points/domain/tier-counts')
const assertObjectType = require('../../app/points/domain/validation/assert-object-type')
const assertNumber = require('../../app/points/domain/validation/assert-number')

const calculateWeightedPoints = function (count, points, weighting) {
  let weightedPoints = points

  if (weighting !== undefined) {
    weightedPoints = points * invertWeightingPercentage(weighting)
  }

  return count * weightedPoints
}

const invertWeightingPercentage = function (weightingPercentage) {
  let multiplier
  if (weightingPercentage >= 100) {
    multiplier = 0
  } else if (weightingPercentage <= 0) {
    multiplier = 1
  } else {
    multiplier = (100 - weightingPercentage) / 100
  }
  return multiplier
}

module.exports = function (tierCounts, tierPoints, caseTypeWeightings, subtractInactiveCases = false) {
  assertObjectType(tierCounts, TierCounts, 'Tier-counts')
  assertNumber(tierPoints, 'Tier Points')
  let pointsForTier = calculateWeightedPoints(tierCounts.total, tierPoints)
  // As of WMT0115, the wmt_extract_filtered worksheet is used for tier totals
  // This tab already has inactive case totals removed so no need to subtract them here
  // t2a cases still have inactive case totals in the t2a worksheet so we still need to subtract the points for
  // these cases, the variable subtractInactiveCases is used to allow this
  if (subtractInactiveCases) {
    pointsForTier -= calculateWeightedPoints(tierCounts.warrants, tierPoints, caseTypeWeightings.warrants)
    pointsForTier -= calculateWeightedPoints(tierCounts.unpaidWork, tierPoints, caseTypeWeightings.unpaidWork)
    pointsForTier -= calculateWeightedPoints(tierCounts.overdueTermination, tierPoints, caseTypeWeightings.overdueTermination)
  }

  return pointsForTier
}

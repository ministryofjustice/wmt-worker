const calculatePercentage = require('./percentage-calculator').calculatePercentage

module.exports = function (results) {
  let totalsToReturn = {}
  if (results.length !== undefined) {
    results.forEach(function (result) {
      result.remainingPoints = result.availablePoints - result.totalPoints
      result.capacityPercentage = calculatePercentage(result.totalPoints, result.availablePoints)
      result.cmsPercentage = calculatePercentage(result.cmsAdjustmentPoints, result.availablePoints)
    })
    totalsToReturn = results
  } else {
    const capacityPercentage = calculatePercentage(results.totalPoints, results.availablePoints)
    const cmsPercentage = calculatePercentage(results.cmsAdjustmentPoints, results.availablePoints)
    totalsToReturn = Object.assign({}, results, { capacity: capacityPercentage, cmsPercentage })
  }
  return totalsToReturn
}

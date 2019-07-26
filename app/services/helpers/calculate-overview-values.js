const calculatePercentage = require('./percentage-calculator').calculatePercentage

module.exports = function (results) {
  var totalsToReturn = {}
  if (results.length !== undefined) {
    results.forEach(function (result) {
      result.remainingPoints = result.availablePoints - result.totalPoints
      result.capacityPercentage = calculatePercentage(result.totalPoints, result.availablePoints)
      result.cmsPercentage = calculatePercentage(result.cmsAdjustmentPoints, result.totalPoints)
    })
    totalsToReturn = results
  } else {
    var capacityPercentage = calculatePercentage(results.totalPoints, results.availablePoints)
    var cmsPercentage = calculatePercentage(results.cmsAdjustmentPoints, results.totalPoints)
    totalsToReturn = Object.assign({}, results, {capacity: capacityPercentage, cmsPercentage: cmsPercentage})
  }
  return totalsToReturn
}

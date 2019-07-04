module.exports = function (capacity) {
  var capacityArray = []
  capacity.forEach(function (record) {
    capacityArray.push([
      record.regionName,
      record.lduCluster,
      record.teamName,
      record.offenderManager,
      record.gradeCode,
      formatCapacityValue(record.capacityPercentage),
      record.availablePoints,
      record.remainingPoints,
      record.contractedHours,
      record.reductionHours,
      record.totalCases,
      record.cmsAdjustmentPoints,
      formatCMSPercentage(record.cmsPercentage)
    ])
  })
  return capacityArray
}

var formatCapacityValue = function (capacity) {
  return (Math.round(capacity)) / 100
}

var formatCMSPercentage = function (cms) {
  return (cms.toFixed(1)) / 100
}

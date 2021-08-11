const getHours = require('./calculate-contracted-hours')

const calculateAvailablePoints = function (nominalTarget, baseHours, hoursReduction, defaultContractedHoursForBand) {
  return (nominalTarget * (baseHours / defaultContractedHoursForBand)) * ((baseHours - hoursReduction) / baseHours)
}

module.exports = function (nominalTarget, offenderManagerTypeId, contractedHoursPerWeek,
  hoursReduction, defaultContractedHours) {
  let availablePoints = 0
  const resultHours = getHours(contractedHoursPerWeek, defaultContractedHours, offenderManagerTypeId)
  if (resultHours !== null && resultHours.baseHours !== 0 && resultHours.defaultContractedHoursForBand !== 0) {
    availablePoints = calculateAvailablePoints(nominalTarget, resultHours.baseHours, hoursReduction, resultHours.defaultContractedHoursForBand)
  }
  return parseInt(availablePoints, 10)
}

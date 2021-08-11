const CaseTypeWeightings = require('../../app/services/probation-rules/app/points/domain/case-type-weightings')
const LocationPointsConfiguration = require('../../app/services/probation-rules/app/points/domain/location-points-configuration')
const PointsConfiguration = require('../../app/services/probation-rules/app/points/domain/points-configuration')
const DefaultContractedHours = require('../../app/services/probation-rules/app/points/domain/default-contracted-hours')
const DefaultNominalTargets = require('../../app/services/probation-rules/app/points/domain/default-nominal-targets')

const getLocationPointsConfiguration = function () {
  const locationPointsConfiguration = new LocationPointsConfiguration(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16)
  return locationPointsConfiguration
}

module.exports.getCaseTypeWeightings = function () {
  const pointsConfig = new PointsConfiguration(
    getLocationPointsConfiguration(),
    getLocationPointsConfiguration(),
    getLocationPointsConfiguration(),
    4, // sdr
    5, // sdr conversions
    new DefaultNominalTargets(1, 2),
    new DefaultContractedHours(1, 2, 3),
    true, // paroms enabled
    8 // paroms
  )
  return new CaseTypeWeightings(0, 100, 0, 4, 5, pointsConfig)
  // warrants, unpaid, overdue, armsComm, armsLicense
}

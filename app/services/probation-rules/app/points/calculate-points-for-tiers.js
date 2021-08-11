const calculatePointsForTier = require('../../app/points/calculate-points-for-tier')
const CaseTypeWeightings = require('../../app/points/domain/case-type-weightings')
const Tiers = require('../../app/points/domain/tiers')
const LocationPointsConfiguration = require('../../app/points/domain/location-points-configuration')
const assertObjectType = require('../../app/points/domain/validation/assert-object-type')

module.exports = function (locationTiers, locationPointsConfiguration, caseTypeWeightings, subtractInactiveCases = false) {
  assertObjectType(locationTiers, Tiers, 'Tiers')
  assertObjectType(locationPointsConfiguration, LocationPointsConfiguration, 'LocationPointsConfiguration')
  assertObjectType(caseTypeWeightings, CaseTypeWeightings, 'CaseTypeWeightings')

  let points = 0
  const tiersPointConfigurationAsList = locationPointsConfiguration.asTierList()

  const tiers = locationTiers.getTiersAsList()

  // purposely leave out the untiered cases
  for (let i = 0; i < tiers.length - 1; i++) {
    points += calculatePointsForTier(tiers[i], tiersPointConfigurationAsList[i], caseTypeWeightings, subtractInactiveCases)
  }
  return points
}

const calculatePointsForTiers = require('./calculate-points-for-tiers')
const calculateSdrConversionPoints = require('./calculate-sdr-conversion-points')
const calculateParomPoints = require('./calculate-parom-points')
const calculateArmsPoints = require('./calculate-arms-points')

const Workload = require('./domain/workload')
const CaseTypeWeightings = require('./domain/case-type-weightings')
const assertObjectType = require('./domain/validation/assert-object-type')

module.exports = function (workload, caseTypeWeightings, t2aCaseTypeWeightings) {
  assertObjectType(workload, Workload, 'workload')
  assertObjectType(caseTypeWeightings, CaseTypeWeightings, 'CaseTypeWeightings')
  assertObjectType(t2aCaseTypeWeightings, CaseTypeWeightings, 'CaseTypeWeightings')

  const communityTierPoints = calculatePointsForTiers(workload.communityTiers, caseTypeWeightings.pointsConfiguration.communityTierPointsConfig, caseTypeWeightings, false)
  const custodyTierPoints = calculatePointsForTiers(workload.custodyTiers, caseTypeWeightings.pointsConfiguration.custodyTierPointsConfig, caseTypeWeightings, false)
  const licenseTierPoints = calculatePointsForTiers(workload.licenseTiers, caseTypeWeightings.pointsConfiguration.licenseTierPointsConfig, caseTypeWeightings, false)
  const projectedLicenseTierPoints = calculatePointsForTiers(workload.custodyTiers, caseTypeWeightings.pointsConfiguration.licenseTierPointsConfig, caseTypeWeightings, false)

  const t2aCommunityTierPoints = calculatePointsForTiers(workload.t2aCommunityTiers, t2aCaseTypeWeightings.pointsConfiguration.communityTierPointsConfig, t2aCaseTypeWeightings, true)
  const t2aCustodyTierPoints = calculatePointsForTiers(workload.t2aCustodyTiers, t2aCaseTypeWeightings.pointsConfiguration.custodyTierPointsConfig, t2aCaseTypeWeightings, true)
  const t2aLicenseTierPoints = calculatePointsForTiers(workload.t2aLicenseTiers, t2aCaseTypeWeightings.pointsConfiguration.licenseTierPointsConfig, t2aCaseTypeWeightings, true)
  const t2aProjectedLicenseTierPoints = calculatePointsForTiers(workload.t2aCustodyTiers, t2aCaseTypeWeightings.pointsConfiguration.licenseTierPointsConfig, t2aCaseTypeWeightings, true)

  const sdrConversionPointsLast30Days = calculateSdrConversionPoints(workload.sdrConversionsLast30Days, caseTypeWeightings.pointsConfiguration.sdrConversion)
  const monthlySdrConversionPoints = calculateSdrConversionPoints(workload.monthlySdrs, caseTypeWeightings.pointsConfiguration.sdr)
  const paromsPoints = calculateParomPoints(workload.paromsCompletedLast30Days, caseTypeWeightings.pointsConfiguration.parom, caseTypeWeightings.pointsConfiguration.paromsEnabled)
  const armsPoints = calculateArmsPoints(workload.armsLicenseCases, workload.armsCommunityCases, caseTypeWeightings.armsLicense, caseTypeWeightings.armsCommunity)

  const totalWorkloadPoints = communityTierPoints +
                                custodyTierPoints +
                                licenseTierPoints +
                                t2aCommunityTierPoints +
                                t2aCustodyTierPoints +
                                t2aLicenseTierPoints +
                                sdrConversionPointsLast30Days +
                                monthlySdrConversionPoints +
                                paromsPoints +
                                armsPoints

  const pointsBreakdown = {
    total: totalWorkloadPoints,
    communityTierPoints: communityTierPoints,
    custodyTierPoints: custodyTierPoints,
    licenseTierPoints: licenseTierPoints,
    t2aCommunityTierPoints: t2aCommunityTierPoints,
    t2aCustodyTierPoints: t2aCustodyTierPoints,
    t2aLicenseTierPoints: t2aLicenseTierPoints,
    sdrPoints: monthlySdrConversionPoints,
    sdrConversionPoints: sdrConversionPointsLast30Days,
    paromsPoints: paromsPoints,
    armsPoints: armsPoints,
    projectedLicenseTierPoints: projectedLicenseTierPoints,
    t2aProjectedLicenseTierPoints: t2aProjectedLicenseTierPoints
  }
  return pointsBreakdown
}

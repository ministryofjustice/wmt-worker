const knex = require('../../../knex').appSchema
const CaseTypeWeightings = require('../probation-rules').CaseTypeWeightings
const PointsConfiguration = require('../probation-rules').PointsConfiguration
const LocationPointsConfiguration = require('../probation-rules').LocationPointsConfiguration
const DefaultNominalTargets = require('../probation-rules').DefaultNominalTargets
const DefaultContractedHours = require('../probation-rules').DefaultContractedHours

module.exports = function (isT2a = false) {
  return knex('workload_points')
    .withSchema('app')
    .orderBy('effective_from', 'desc')
    .whereNull('effective_to')
    .where('is_t2a', isT2a)
    .first()
    .then(function (result) {
      const defaultNominalTargets = new DefaultNominalTargets(result.nominal_target_spo, result.nominal_target_po)
      const defaultContractedHours = new DefaultContractedHours(result.default_contracted_hours_pso, result.default_contracted_hours_po, result.default_contracted_hours_spo)
      const communityLocationPointsConfiguration = new LocationPointsConfiguration(result.comm_tier_1,
        result.comm_tier_2,
        result.comm_tier_3,
        result.comm_tier_4,
        result.comm_tier_5,
        result.comm_tier_6,
        result.comm_tier_7,
        result.comm_tier_8,
        result.comm_tier_9,
        result.comm_tier_10,
        result.comm_tier_11,
        result.comm_tier_12,
        result.comm_tier_13,
        result.comm_tier_14,
        result.comm_tier_15,
        result.comm_tier_16,
        result.comm_tier_1_s,
        result.comm_tier_2_s,
        result.comm_tier_3_s,
        result.comm_tier_4_s,
        result.comm_tier_5_s,
        result.comm_tier_6_s,
        result.comm_tier_7_s,
        result.comm_tier_8_s,
        result.comm_tier_9_s,
        result.comm_tier_10_s,
        result.comm_tier_11_s,
        result.comm_tier_12_s,
        result.comm_tier_13_s,
        result.comm_tier_14_s,
        result.comm_tier_15_s,
        result.comm_tier_16_s
      )
      const licenseLocationPointsConfiguration = new LocationPointsConfiguration(result.lic_tier_1,
        result.lic_tier_2,
        result.lic_tier_3,
        result.lic_tier_4,
        result.lic_tier_5,
        result.lic_tier_6,
        result.lic_tier_7,
        result.lic_tier_8,
        result.lic_tier_9,
        result.lic_tier_10,
        result.lic_tier_11,
        result.lic_tier_12,
        result.lic_tier_13,
        result.lic_tier_14,
        result.lic_tier_15,
        result.lic_tier_16,
        result.lic_tier_1_s,
        result.lic_tier_2_s,
        result.lic_tier_3_s,
        result.lic_tier_4_s,
        result.lic_tier_5_s,
        result.lic_tier_6_s,
        result.lic_tier_7_s,
        result.lic_tier_8_s,
        result.lic_tier_9_s,
        result.lic_tier_10_s,
        result.lic_tier_11_s,
        result.lic_tier_12_s,
        result.lic_tier_13_s,
        result.lic_tier_14_s,
        result.lic_tier_15_s,
        result.lic_tier_16_s)
      const custodyLocationPointsConfiguration = new LocationPointsConfiguration(result.cust_tier_1,
        result.cust_tier_2,
        result.cust_tier_3,
        result.cust_tier_4,
        result.cust_tier_5,
        result.cust_tier_6,
        result.cust_tier_7,
        result.cust_tier_8,
        result.cust_tier_9,
        result.cust_tier_10,
        result.cust_tier_11,
        result.cust_tier_12,
        result.cust_tier_13,
        result.cust_tier_14,
        result.cust_tier_15,
        result.cust_tier_16,
        result.cust_tier_1_s,
        result.cust_tier_2_s,
        result.cust_tier_3_s,
        result.cust_tier_4_s,
        result.cust_tier_5_s,
        result.cust_tier_6_s,
        result.cust_tier_7_s,
        result.cust_tier_8_s,
        result.cust_tier_9_s,
        result.cust_tier_10_s,
        result.cust_tier_11_s,
        result.cust_tier_12_s,
        result.cust_tier_13_s,
        result.cust_tier_14_s,
        result.cust_tier_15_s,
        result.cust_tier_16_s)
      const pointsConfiguration = new PointsConfiguration(communityLocationPointsConfiguration,
        licenseLocationPointsConfiguration,
        custodyLocationPointsConfiguration,
        result.sdr,
        result.sdr_conversion,
        defaultNominalTargets,
        defaultContractedHours,
        result.paroms_enabled,
        result.parom)

      const caseTypeWeightings = new CaseTypeWeightings(result.weighting_w,
        result.weighting_u,
        result.weighting_o,
        result.weighting_arms_comm,
        result.weighting_arms_lic,
        pointsConfiguration)

      return { values: caseTypeWeightings, id: result.id }
    })
}

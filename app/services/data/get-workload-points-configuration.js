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
        result.comm.tier_17,
        result.comm.tier_18,
        result.comm.tier_19,
        result.comm.tier_20,
        result.comm.tier_21,
        result.comm.tier_22,
        result.comm.tier_23,
        result.comm.tier_24,
        result.comm.tier_25,
        result.comm.tier_26,
        result.comm.tier_27,
        result.comm.tier_28,
        result.comm.tier_29,
        result.comm.tier_30,
        result.comm.tier_31,
        result.comm.tier_32
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
        result.lic_tier_17,
        result.lic_tier_18,
        result.lic_tier_19,
        result.lic_tier_20,
        result.lic_tier_21,
        result.lic_tier_22,
        result.lic_tier_23,
        result.lic_tier_24,
        result.lic_tier_25,
        result.lic_tier_26,
        result.lic_tier_27,
        result.lic_tier_28,
        result.lic_tier_29,
        result.lic_tier_30,
        result.lic_tier_31,
        result.lic_tier_32)
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
        result.cust_tier_17,
        result.cust_tier_18,
        result.cust_tier_19,
        result.cust_tier_20,
        result.cust_tier_21,
        result.cust_tier_22,
        result.cust_tier_23,
        result.cust_tier_24,
        result.cust_tier_25,
        result.cust_tier_26,
        result.cust_tier_27,
        result.cust_tier_28,
        result.cust_tier_29,
        result.cust_tier_30,
        result.cust_tier_31,
        result.cust_tier_32)
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

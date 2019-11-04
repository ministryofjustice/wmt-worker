const knex = require('../../../knex').appSchema
const CaseTypeWeightings = require('wmt-probation-rules').CaseTypeWeightings
const PointsConfiguration = require('wmt-probation-rules').PointsConfiguration
const LocationPointsConfiguration = require('wmt-probation-rules').LocationPointsConfiguration
const DefaultNominalTargets = require('wmt-probation-rules').DefaultNominalTargets
const DefaultContractedHours = require('wmt-probation-rules').DefaultContractedHours

module.exports = function (isT2a = false) {
  return knex('workload_points')
    .orderBy('effective_from', 'desc')
    .whereNull('effective_to')
    .where('is_t2a', isT2a)
    .first()
    .then(function (result) {
      var defaultNominalTargets = new DefaultNominalTargets(result.nominal_target_spo, result.nominal_target_po)
      var defaultContractedHours = new DefaultContractedHours(result.default_contracted_hours_pso, result.default_contracted_hours_po, result.default_contracted_hours_spo)
      var communityLocationPointsConfiguration = new LocationPointsConfiguration(result.comm_tier_1,
                                                                         result.comm_tier_2,
                                                                         result.comm_tier_3,
                                                                         result.comm_tier_4,
                                                                         result.comm_tier_5,
                                                                         result.comm_tier_6,
                                                                         result.comm_tier_7,
                                                                         result.comm_tier_8,
                                                                         result.comm_tier_9,
                                                                         result.comm_tier_10)
      var licenseLocationPointsConfiguration = new LocationPointsConfiguration(result.lic_tier_1,
                                                                       result.lic_tier_2,
                                                                       result.lic_tier_3,
                                                                       result.lic_tier_4,
                                                                       result.lic_tier_5,
                                                                       result.lic_tier_6,
                                                                       result.lic_tier_7,
                                                                       result.lic_tier_8,
                                                                       result.lic_tier_9,
                                                                       result.lic_tier_10)
      var custodyLocationPointsConfiguration = new LocationPointsConfiguration(result.cust_tier_1,
                                                                       result.cust_tier_2,
                                                                       result.cust_tier_3,
                                                                       result.cust_tier_4,
                                                                       result.cust_tier_5,
                                                                       result.cust_tier_6,
                                                                       result.cust_tier_7,
                                                                       result.cust_tier_8,
                                                                       result.cust_tier_9,
                                                                       result.cust_tier_10)
      var pointsConfiguration = new PointsConfiguration(communityLocationPointsConfiguration,
                                                        licenseLocationPointsConfiguration,
                                                        custodyLocationPointsConfiguration,
                                                        result.sdr,
                                                        result.sdr_conversion,
                                                        defaultNominalTargets,
                                                        defaultContractedHours,
                                                        result.paroms_enabled,
                                                        result.parom)

      var caseTypeWeightings = new CaseTypeWeightings(result.weighting_w,
                                                      result.weighting_u,
                                                      result.weighting_o,
                                                      result.weighting_arms_comm,
                                                      result.weighting_arms_lic,
                                                      pointsConfiguration)

      return { values: caseTypeWeightings, id: result.id }
    })
}

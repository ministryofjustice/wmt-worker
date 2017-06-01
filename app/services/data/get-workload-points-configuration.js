const knexConfig = require('../../../knexfile').development
const knex = require('knex')(knexConfig)
const CaseTypeWeightings = require('wmt-probation-rules').CaseTypeWeightings
const PointsConfiguration = require('wmt-probation-rules').PointsConfiguration
const TierPointsConfiguration = require('wmt-probation-rules').TierPointsConfiguration

module.exports = function (pointsId) {
  return knex.select().from('workload_points')
    .where('id', pointsId)
    .then(function (results) {
      var communityTierPointsConfiguration = new TierPointsConfiguration(results.comm_tier_1,
                                                                         results.comm_tier_2,
                                                                         results.comm_tier_3,
                                                                         results.comm_tier_4,
                                                                         results.comm_tier_5,
                                                                         results.comm_tier_6,
                                                                         results.comm_tier_7)
      var licenseTierPointsConfiguration = new TierPointsConfiguration(results.lic_tier_1,
                                                                       results.lic_tier_2,
                                                                       results.lic_tier_3,
                                                                       results.lic_tier_4,
                                                                       results.lic_tier_5,
                                                                       results.lic_tier_6,
                                                                       results.lic_tier_7)
      var custodyTierPointsConfiguration = new TierPointsConfiguration(results.cust_tier_1,
                                                                       results.cust_tier_2,
                                                                       results.cust_tier_3,
                                                                       results.cust_tier_4,
                                                                       results.cust_tier_5,
                                                                       results.cust_tier_6,
                                                                       results.cust_tier_7)
      var pointsConfiguration = new PointsConfiguration(communityTierPointsConfiguration,
                                                        licenseTierPointsConfiguration,
                                                        custodyTierPointsConfiguration,
                                                        results.sdr,
                                                        results.sdr_conversion,
                                                        results.nominal_target_spo,
                                                        results.nominal_target_po,
                                                        results.default_contract_hours_po,
                                                        results.default_contract_hours_spo,
                                                        results.parom_enabled,
                                                        results.parom)

      var caseTypeWeightings = new CaseTypeWeightings(results.weighting_w,
                                                      results.weighting_u,
                                                      results.weighting_o,
                                                      pointsConfiguration)

      return caseTypeWeightings
    })
}

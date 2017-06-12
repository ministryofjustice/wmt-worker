const knexConfig = require('../../../knexfile').app
const knex = require('knex')(knexConfig)
const CaseTypeWeightings = require('wmt-probation-rules').CaseTypeWeightings
const PointsConfiguration = require('wmt-probation-rules').PointsConfiguration
const LocationPointsConfiguration = require('wmt-probation-rules').LocationPointsConfiguration
const DefaultNominalTargets = require('wmt-probation-rules').DefaultNominalTargets
const DefaultContractedHours = require('wmt-probation-rules').DefaultContractedHours

module.exports = function () {
  return knex('workload_points')
    .orderBy('effective_from', 'desc')
    .first()
    .then(function (results) {
      var defaultNominalTargets = new DefaultNominalTargets(results.nominal_target_spo, results.nominal_target_po)
      var defaultContractedHours = new DefaultContractedHours(results.default_contracted_hours_pso, results.default_contracted_hours_po)
      var communityLocationPointsConfiguration = new LocationPointsConfiguration(results.comm_tier_1,
                                                                         results.comm_tier_2,
                                                                         results.comm_tier_3,
                                                                         results.comm_tier_4,
                                                                         results.comm_tier_5,
                                                                         results.comm_tier_6,
                                                                         results.comm_tier_7)
      var licenseLocationPointsConfiguration = new LocationPointsConfiguration(results.lic_tier_1,
                                                                       results.lic_tier_2,
                                                                       results.lic_tier_3,
                                                                       results.lic_tier_4,
                                                                       results.lic_tier_5,
                                                                       results.lic_tier_6,
                                                                       results.lic_tier_7)
      var custodyLocationPointsConfiguration = new LocationPointsConfiguration(results.cust_tier_1,
                                                                       results.cust_tier_2,
                                                                       results.cust_tier_3,
                                                                       results.cust_tier_4,
                                                                       results.cust_tier_5,
                                                                       results.cust_tier_6,
                                                                       results.cust_tier_7)
      var pointsConfiguration = new PointsConfiguration(communityLocationPointsConfiguration,
                                                        licenseLocationPointsConfiguration,
                                                        custodyLocationPointsConfiguration,
                                                        results.sdr,
                                                        results.sdr_conversion,
                                                        defaultNominalTargets,
                                                        defaultContractedHours,
                                                        results.paroms_enabled,
                                                        results.parom)

      var caseTypeWeightings = new CaseTypeWeightings(results.weighting_w,
                                                      results.weighting_u,
                                                      results.weighting_o,
                                                      pointsConfiguration)

      return caseTypeWeightings
    })
}

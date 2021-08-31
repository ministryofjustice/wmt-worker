const assertObjectType = require('./validation/assert-object-type')
const assertNumber = require('./validation/assert-number')
const assertBoolean = require('./validation/assert-boolean')
const LocationPointsConfiguration = require('./location-points-configuration')
const DefaultContractedHours = require('./default-contracted-hours')
const DefaultNominalTargets = require('./default-nominal-targets')
// WMT0160: Add reference to community version of LocationPointsConfiguration
class PointsConfiguration {
  constructor (communityTierPointsConfig, licenseTierPointsConfig, custodyTierPointsConfig,
    sdr, sdrConversion, defaultNominalTargets, defaultContractedHours, paromsEnabled, parom) {
    this.communityTierPointsConfig = communityTierPointsConfig
    this.licenseTierPointsConfig = licenseTierPointsConfig
    this.custodyTierPointsConfig = custodyTierPointsConfig
    this.sdr = sdr
    this.sdrConversion = sdrConversion
    this.defaultNominalTargets = defaultNominalTargets
    this.defaultContractedHours = defaultContractedHours
    this.paromsEnabled = paromsEnabled
    this.parom = parom
    this.isValid()
  }

  isValid () {
    assertObjectType(this.communityTierPointsConfig, LocationPointsConfiguration, 'Community Tier Points Config')
    assertObjectType(this.licenseTierPointsConfig, LocationPointsConfiguration, 'License Tier Points Config')
    assertObjectType(this.custodyTierPointsConfig, LocationPointsConfiguration, 'Custody Tier Points Config')
    assertNumber(this.sdr, 'SDR')
    assertNumber(this.sdrConversion, 'SDR Conversion')
    assertObjectType(this.defaultNominalTargets, DefaultNominalTargets, 'Default Nominal Targets')
    assertObjectType(this.defaultContractedHours, DefaultContractedHours, 'Default Contracted Hours')
    assertNumber(this.parom, 'Parom')
    assertBoolean(this.paromsEnabled, 'Paroms')
  }
}

module.exports = PointsConfiguration

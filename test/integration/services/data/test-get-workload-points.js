const expect = require('chai').expect

const helper = require('../../../helpers/data/app-workload-points-helper')
const getWorkloadPoints = require('../../../../app/services/data/get-workload-points-configuration')

const CaseTypeWeightings = require('wmt-probation-rules').CaseTypeWeightings

let inserts = []
let isT2A = false

describe('services/data/get-workload-points', function () {
  before(function () {
    return helper.insertDependencies(inserts)
      .then(function (builtInserts) {
        inserts = builtInserts
      })
  })

  it('retrieves the latest points configuration', function () {
    return getWorkloadPoints(isT2A).then(function (result) {
      const points = result.values
      expect(points).to.be.an.instanceof(CaseTypeWeightings)
      const commPointsConf = points.pointsConfiguration.communityTierPointsConfig
      const custodyPointsConf = points.pointsConfiguration.custodyTierPointsConfig
      const licensePointsConf = points.pointsConfiguration.licenseTierPointsConfig

      const expectedCommPointsConf = [206, 158, 146, 110, 146, 115, 102, 72, 79, 63, 50, 35, 51, 41, 29, 29]
      const expectedCustPointsConf = [75, 60, 59, 0, 59, 48, 47, 0, 30, 24, 23, 0, 17, 14, 13, 0]
      const expectedLicPointsConf = [219, 175, 163, 0, 161, 132, 119, 0, 77, 65, 52, 0, 51, 43, 31, 0]
      for (let i = 1; i < 17; i++) {
        expect(commPointsConf['tier' + i], 'Community Tier ' + i + ' weighting should equal ' + expectedCommPointsConf[i - 1]).to.equal(expectedCommPointsConf[i - 1])
        expect(custodyPointsConf['tier' + i], 'Custody Tier ' + i + ' weighting should equal ' + expectedCustPointsConf[i - 1]).to.equal(expectedCustPointsConf[i - 1])
        expect(licensePointsConf['tier' + i], 'Licence Tier ' + i + ' weighting should equal ' + expectedLicPointsConf[i - 1]).to.equal(expectedLicPointsConf[i - 1])
      }

      expect(points.pointsConfiguration.sdr).to.equal(22)
      expect(points.pointsConfiguration.sdrConversion).to.equal(23)
      expect(points.pointsConfiguration.defaultNominalTargets.pso).to.equal(24)
      expect(points.pointsConfiguration.defaultNominalTargets.po).to.equal(25)
      expect(points.pointsConfiguration.defaultContractedHours.po).to.equal(26)
      expect(points.pointsConfiguration.defaultContractedHours.pso).to.equal(27)
      expect(points.pointsConfiguration.defaultContractedHours.spo).to.equal(0)

      expect(points.overdueTermination).to.equal(28)
      expect(points.warrants).to.equal(29)
      expect(points.unpaidWork).to.equal(30)

      expect(points.armsLicense).to.equal(32)
      expect(points.armsCommunity).to.equal(33)

      expect(points.pointsConfiguration.paromsEnabled).to.equal(true)
      expect(points.pointsConfiguration.parom).to.equal(31)
    })
  })

  it('retrieves the latest t2a points configuration', function () {
    isT2A = true
    return getWorkloadPoints(isT2A).then(function (result) {
      const points = result.values
      expect(points).to.be.an.instanceof(CaseTypeWeightings)

      const commPointsConf = points.pointsConfiguration.communityTierPointsConfig
      const custodyPointsConf = points.pointsConfiguration.custodyTierPointsConfig
      const licensePointsConf = points.pointsConfiguration.licenseTierPointsConfig

      const expectedCommPointsConf = [75, 60, 59, 0, 59, 48, 47, 0, 30, 24, 23, 0, 17, 14, 13, 0]
      const expectedCustPointsConf = [75, 60, 59, 0, 59, 48, 47, 0, 30, 24, 23, 0, 17, 14, 13, 0]
      const expectedLicPointsConf = [75, 60, 59, 0, 59, 48, 47, 0, 30, 24, 23, 0, 17, 14, 13, 0]
      for (let i = 1; i < 17; i++) {
        expect(commPointsConf['tier' + i], 'Community Tier ' + i + ' weighting should equal ' + expectedCommPointsConf[i - 1]).to.equal(expectedCommPointsConf[i - 1])
        expect(custodyPointsConf['tier' + i], 'Custody Tier ' + i + ' weighting should equal ' + expectedCustPointsConf[i - 1]).to.equal(expectedCustPointsConf[i - 1])
        expect(licensePointsConf['tier' + i], 'Licence Tier ' + i + ' weighting should equal ' + expectedLicPointsConf[i - 1]).to.equal(expectedLicPointsConf[i - 1])
      }

      expect(points.pointsConfiguration.sdr).to.equal(0)
      expect(points.pointsConfiguration.sdrConversion).to.equal(0)
      expect(points.pointsConfiguration.defaultNominalTargets.pso).to.equal(0)
      expect(points.pointsConfiguration.defaultNominalTargets.po).to.equal(0)
      expect(points.pointsConfiguration.defaultContractedHours.po).to.equal(0)
      expect(points.pointsConfiguration.defaultContractedHours.pso).to.equal(0)
      expect(points.pointsConfiguration.defaultContractedHours.spo).to.equal(0)

      expect(points.overdueTermination).to.equal(25)
      expect(points.warrants).to.equal(26)
      expect(points.unpaidWork).to.equal(27)

      expect(points.armsLicense).to.equal(0)
      expect(points.armsCommunity).to.equal(0)

      expect(points.pointsConfiguration.paromsEnabled).to.equal(false)
      expect(points.pointsConfiguration.parom).to.equal(0)
    })
  })

  after(function () {
    return helper.removeDependencies(inserts)
  })
})

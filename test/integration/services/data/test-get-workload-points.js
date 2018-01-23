const expect = require('chai').expect

const helper = require('../../../helpers/data/app-workload-points-helper')
const getWorkloadPoints = require('../../../../app/services/data/get-workload-points-configuration')

const CaseTypeWeightings = require('wmt-probation-rules').CaseTypeWeightings

var inserts = []
var isT2A = false

describe('services/data/get-workload-points', function () {
  before(function (done) {
    helper.insertDependencies(inserts)
      .then(function (builtInserts) {
        inserts = builtInserts
        done()
      })
  })

  it('retrieves the latest points configuration', function (done) {
    getWorkloadPoints(isT2A).then(function (result) {
      var points = result.values
      expect(points).to.be.an.instanceof(CaseTypeWeightings)
      var commPointsConf = points.pointsConfiguration.communityTierPointsConfig

      expect(commPointsConf.tierSeven).to.equal(1)
      expect(commPointsConf.tierSix).to.equal(2)
      expect(commPointsConf.tierFive).to.equal(3)
      expect(commPointsConf.tierFour).to.equal(4)
      expect(commPointsConf.tierThree).to.equal(5)
      expect(commPointsConf.tierTwo).to.equal(6)
      expect(commPointsConf.tierOne).to.equal(7)

      var custodyPointsConf = points.pointsConfiguration.custodyTierPointsConfig
      expect(custodyPointsConf.tierSeven).to.equal(8)
      expect(custodyPointsConf.tierSix).to.equal(9)
      expect(custodyPointsConf.tierFive).to.equal(10)
      expect(custodyPointsConf.tierFour).to.equal(11)
      expect(custodyPointsConf.tierThree).to.equal(12)
      expect(custodyPointsConf.tierTwo).to.equal(13)
      expect(custodyPointsConf.tierOne).to.equal(14)

      var licensePointsConf = points.pointsConfiguration.licenseTierPointsConfig
      expect(licensePointsConf.tierSeven).to.equal(15)
      expect(licensePointsConf.tierSix).to.equal(16)
      expect(licensePointsConf.tierFive).to.equal(17)
      expect(licensePointsConf.tierFour).to.equal(18)
      expect(licensePointsConf.tierThree).to.equal(19)
      expect(licensePointsConf.tierTwo).to.equal(20)
      expect(licensePointsConf.tierOne).to.equal(21)

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
      done()
    })
  })

  it('retrieves the latest t2a points configuration', function (done) {
    isT2A = true
    getWorkloadPoints(isT2A).then(function (result) {
      var points = result.values
      expect(points).to.be.an.instanceof(CaseTypeWeightings)
      var commPointsConf = points.pointsConfiguration.communityTierPointsConfig

      expect(commPointsConf.tierSeven).to.equal(5)
      expect(commPointsConf.tierSix).to.equal(6)
      expect(commPointsConf.tierFive).to.equal(7)
      expect(commPointsConf.tierFour).to.equal(8)
      expect(commPointsConf.tierThree).to.equal(9)
      expect(commPointsConf.tierTwo).to.equal(10)
      expect(commPointsConf.tierOne).to.equal(11)

      var custodyPointsConf = points.pointsConfiguration.custodyTierPointsConfig
      expect(custodyPointsConf.tierSeven).to.equal(12)
      expect(custodyPointsConf.tierSix).to.equal(13)
      expect(custodyPointsConf.tierFive).to.equal(14)
      expect(custodyPointsConf.tierFour).to.equal(15)
      expect(custodyPointsConf.tierThree).to.equal(16)
      expect(custodyPointsConf.tierTwo).to.equal(17)
      expect(custodyPointsConf.tierOne).to.equal(18)

      var licensePointsConf = points.pointsConfiguration.licenseTierPointsConfig
      expect(licensePointsConf.tierSeven).to.equal(19)
      expect(licensePointsConf.tierSix).to.equal(20)
      expect(licensePointsConf.tierFive).to.equal(21)
      expect(licensePointsConf.tierFour).to.equal(22)
      expect(licensePointsConf.tierThree).to.equal(23)
      expect(licensePointsConf.tierTwo).to.equal(23)
      expect(licensePointsConf.tierOne).to.equal(24)

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
      done()
    })
  })

  after(function (done) {
    helper.removeDependencies(inserts)
      .then(() => done())
  })
})

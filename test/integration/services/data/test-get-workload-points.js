const expect = require('chai').expect

const helper = require('../../../helpers/data/app-workload-points-helper')
const getWorkloadPoints = require('../../../../app/services/data/get-workload-points-configuration')

const CaseTypeWeightings = require('wmt-probation-rules').CaseTypeWeightings

let inserts = []
let isT2A = false

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
      const points = result.values
      expect(points).to.be.an.instanceof(CaseTypeWeightings)
      const commPointsConf = points.pointsConfiguration.communityTierPointsConfig

      expect(commPointsConf.tierTen).to.equal(102)
      expect(commPointsConf.tierNine).to.equal(101)
      expect(commPointsConf.tierEight).to.equal(100)
      expect(commPointsConf.tierSeven).to.equal(7)
      expect(commPointsConf.tierSix).to.equal(6)
      expect(commPointsConf.tierFive).to.equal(5)
      expect(commPointsConf.tierFour).to.equal(4)
      expect(commPointsConf.tierThree).to.equal(3)
      expect(commPointsConf.tierTwo).to.equal(2)
      expect(commPointsConf.tierOne).to.equal(1)

      const custodyPointsConf = points.pointsConfiguration.custodyTierPointsConfig
      expect(custodyPointsConf.tierTen).to.equal(105)
      expect(custodyPointsConf.tierNine).to.equal(104)
      expect(custodyPointsConf.tierEight).to.equal(103)
      expect(custodyPointsConf.tierSeven).to.equal(14)
      expect(custodyPointsConf.tierSix).to.equal(13)
      expect(custodyPointsConf.tierFive).to.equal(12)
      expect(custodyPointsConf.tierFour).to.equal(11)
      expect(custodyPointsConf.tierThree).to.equal(10)
      expect(custodyPointsConf.tierTwo).to.equal(9)
      expect(custodyPointsConf.tierOne).to.equal(8)

      const licensePointsConf = points.pointsConfiguration.licenseTierPointsConfig
      expect(licensePointsConf.tierTen).to.equal(108)
      expect(licensePointsConf.tierNine).to.equal(107)
      expect(licensePointsConf.tierEight).to.equal(106)
      expect(licensePointsConf.tierSeven).to.equal(21)
      expect(licensePointsConf.tierSix).to.equal(20)
      expect(licensePointsConf.tierFive).to.equal(19)
      expect(licensePointsConf.tierFour).to.equal(18)
      expect(licensePointsConf.tierThree).to.equal(17)
      expect(licensePointsConf.tierTwo).to.equal(16)
      expect(licensePointsConf.tierOne).to.equal(15)

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
      const points = result.values
      expect(points).to.be.an.instanceof(CaseTypeWeightings)
      const commPointsConf = points.pointsConfiguration.communityTierPointsConfig

      expect(commPointsConf.tierTen).to.equal(82)
      expect(commPointsConf.tierNine).to.equal(81)
      expect(commPointsConf.tierEight).to.equal(80)
      expect(commPointsConf.tierSeven).to.equal(11)
      expect(commPointsConf.tierSix).to.equal(10)
      expect(commPointsConf.tierFive).to.equal(9)
      expect(commPointsConf.tierFour).to.equal(8)
      expect(commPointsConf.tierThree).to.equal(7)
      expect(commPointsConf.tierTwo).to.equal(6)
      expect(commPointsConf.tierOne).to.equal(5)

      const custodyPointsConf = points.pointsConfiguration.custodyTierPointsConfig
      expect(custodyPointsConf.tierTen).to.equal(85)
      expect(custodyPointsConf.tierNine).to.equal(84)
      expect(custodyPointsConf.tierEight).to.equal(83)
      expect(custodyPointsConf.tierSeven).to.equal(18)
      expect(custodyPointsConf.tierSix).to.equal(17)
      expect(custodyPointsConf.tierFive).to.equal(16)
      expect(custodyPointsConf.tierFour).to.equal(15)
      expect(custodyPointsConf.tierThree).to.equal(14)
      expect(custodyPointsConf.tierTwo).to.equal(13)
      expect(custodyPointsConf.tierOne).to.equal(12)

      const licensePointsConf = points.pointsConfiguration.licenseTierPointsConfig
      expect(licensePointsConf.tierTen).to.equal(88)
      expect(licensePointsConf.tierNine).to.equal(87)
      expect(licensePointsConf.tierEight).to.equal(86)
      expect(licensePointsConf.tierSeven).to.equal(24)
      expect(licensePointsConf.tierSix).to.equal(23)
      expect(licensePointsConf.tierFive).to.equal(23)
      expect(licensePointsConf.tierFour).to.equal(22)
      expect(licensePointsConf.tierThree).to.equal(21)
      expect(licensePointsConf.tierTwo).to.equal(20)
      expect(licensePointsConf.tierOne).to.equal(19)

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

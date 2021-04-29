const expect = require('chai').expect
const proxyquire = require('proxyquire')
const sinon = require('sinon')
const appWorkload = require('../../../constants/app-workload')

let getAppWorkloads
let parseAppWorkloads

describe('services/parse-app-workload', function () {
  before(function () {
    getAppWorkloads = sinon.stub().resolves(appWorkload)

    parseAppWorkloads = proxyquire('../../../../app/services/parse-app-workloads', {
      './data/get-app-workloads': getAppWorkloads
    })
  })

  it('should build a Workload object with the correct case totals', function () {
    return parseAppWorkloads(2201, 2201, 1, 1).then(function (omWorkload) {
      const filteredCommunityTiers = omWorkload[0].values.filteredCommunityTiers

      expect(filteredCommunityTiers.untiered.total, 'Community Untiered Filtered Cases should equal 2').to.be.eql(2)
      expect(filteredCommunityTiers.d0.total, 'Community D0 Filtered Cases should equal 40').to.be.eql(40)
      expect(filteredCommunityTiers.d1.total, 'Community D1 Filtered Cases should equal 32').to.be.eql(32)
      expect(filteredCommunityTiers.d2.total, 'Community D2 Filtered Cases should equal 31').to.be.eql(31)
      expect(filteredCommunityTiers.d3.total, 'Community D3 Filtered Cases should equal 30').to.be.eql(30)
      expect(filteredCommunityTiers.c0.total, 'Community C0 Filtered Cases should equal 24').to.be.eql(24)
      expect(filteredCommunityTiers.c1.total, 'Community C1 Filtered Cases should equal 23').to.be.eql(23)
      expect(filteredCommunityTiers.c2.total, 'Community C2 Filtered Cases should equal 20').to.be.eql(20)
      expect(filteredCommunityTiers.c3.total, 'Community C3 Filtered Cases should equal 16').to.be.eql(16)
      expect(filteredCommunityTiers.b0.total, 'Community B0 Filtered Cases should equal 15').to.be.eql(15)
      expect(filteredCommunityTiers.b1.total, 'Community B1 Filtered Cases should equal 12').to.be.eql(12)
      expect(filteredCommunityTiers.b2.total, 'Community B2 Filtered Cases should equal 11').to.be.eql(11)
      expect(filteredCommunityTiers.b3.total, 'Community B3 Filtered Cases should equal 10').to.be.eql(10)
      expect(filteredCommunityTiers.a0.total, 'Community A0 Filtered Cases should equal 9').to.be.eql(9)
      expect(filteredCommunityTiers.a1.total, 'Community A1 Filtered Cases should equal 7').to.be.eql(7)
      expect(filteredCommunityTiers.a2.total, 'Community A2 Filtered Cases should equal 6').to.be.eql(6)
      expect(filteredCommunityTiers.a3.total, 'Community A3 Filtered Cases should equal 3').to.be.eql(3)

      const filteredCustodyTiers = omWorkload[0].values.filteredCustodyTiers

      expect(filteredCustodyTiers.untiered.total, 'Custody Untiered Filtered Cases should equal 0').to.be.eql(0)
      expect(filteredCustodyTiers.d0.total, 'Custody D0 Filtered Cases should equal 70').to.be.eql(70)
      expect(filteredCustodyTiers.d1.total, 'Custody D1 Filtered Cases should equal 50').to.be.eql(50)
      expect(filteredCustodyTiers.d2.total, 'Custody D2 Filtered Cases should equal 47').to.be.eql(47)
      expect(filteredCustodyTiers.d3.total, 'Custody D3 Filtered Cases should equal 43').to.be.eql(43)
      expect(filteredCustodyTiers.c0.total, 'Custody C0 Filtered Cases should equal 39').to.be.eql(39)
      expect(filteredCustodyTiers.c1.total, 'Custody C1 Filtered Cases should equal 34').to.be.eql(34)
      expect(filteredCustodyTiers.c2.total, 'Custody C2 Filtered Cases should equal 32').to.be.eql(32)
      expect(filteredCustodyTiers.c3.total, 'Custody C3 Filtered Cases should equal 30').to.be.eql(30)
      expect(filteredCustodyTiers.b0.total, 'Custody B0 Filtered Cases should equal 25').to.be.eql(25)
      expect(filteredCustodyTiers.b1.total, 'Custody B1 Filtered Cases should equal 20').to.be.eql(20)
      expect(filteredCustodyTiers.b2.total, 'Custody B2 Filtered Cases should equal 15').to.be.eql(15)
      expect(filteredCustodyTiers.b3.total, 'Custody B3 Filtered Cases should equal 14').to.be.eql(14)
      expect(filteredCustodyTiers.a0.total, 'Custody A0 Filtered Cases should equal 13').to.be.eql(13)
      expect(filteredCustodyTiers.a1.total, 'Custody A1 Filtered Cases should equal 12').to.be.eql(12)
      expect(filteredCustodyTiers.a2.total, 'Custody A2 Filtered Cases should equal 10').to.be.eql(10)
      expect(filteredCustodyTiers.a3.total, 'Custody A3 Filtered Cases should equal 5').to.be.eql(5)

      const filteredLicenseTiers = omWorkload[0].values.filteredLicenseTiers

      expect(filteredLicenseTiers.untiered.total, 'Licence Untiered Filtered Cases should equal 0').to.be.eql(0)
      expect(filteredLicenseTiers.d0.total, 'Licence D0 Filtered Cases should equal 64').to.be.eql(64)
      expect(filteredLicenseTiers.d1.total, 'Licence D1 Filtered Cases should equal 60').to.be.eql(60)
      expect(filteredLicenseTiers.d2.total, 'Licence D2 Filtered Cases should equal 56').to.be.eql(56)
      expect(filteredLicenseTiers.d3.total, 'Licence D3 Filtered Cases should equal 52').to.be.eql(52)
      expect(filteredLicenseTiers.c0.total, 'Licence C0 Filtered Cases should equal 48').to.be.eql(48)
      expect(filteredLicenseTiers.c1.total, 'Licence C1 Filtered Cases should equal 44').to.be.eql(44)
      expect(filteredLicenseTiers.c2.total, 'Licence C2 Filtered Cases should equal 40').to.be.eql(40)
      expect(filteredLicenseTiers.c3.total, 'Licence C3 Filtered Cases should equal 36').to.be.eql(36)
      expect(filteredLicenseTiers.b0.total, 'Licence B0 Filtered Cases should equal 32').to.be.eql(32)
      expect(filteredLicenseTiers.b1.total, 'Licence B1 Filtered Cases should equal 28').to.be.eql(28)
      expect(filteredLicenseTiers.b2.total, 'Licence B2 Filtered Cases should equal 24').to.be.eql(24)
      expect(filteredLicenseTiers.b3.total, 'Licence B3 Filtered Cases should equal 20').to.be.eql(20)
      expect(filteredLicenseTiers.a0.total, 'Licence A0 Filtered Cases should equal 16').to.be.eql(16)
      expect(filteredLicenseTiers.a1.total, 'Licence A1 Filtered Cases should equal 12').to.be.eql(12)
      expect(filteredLicenseTiers.a2.total, 'Licence A2 Filtered Cases should equal 8').to.be.eql(8)
      expect(filteredLicenseTiers.a3.total, 'Licence A3 Filtered Cases should equal 4').to.be.eql(4)
    })
  })
})

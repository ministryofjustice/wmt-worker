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
      expect(filteredCommunityTiers.d2.total, 'Community D2 Filtered Cases should equal 3').to.be.eql(3)
      expect(filteredCommunityTiers.d1.total, 'Community D1 Filtered Cases should equal 6').to.be.eql(6)
      expect(filteredCommunityTiers.c2.total, 'Community C2 Filtered Cases should equal 7').to.be.eql(7)
      expect(filteredCommunityTiers.c1.total, 'Community C1 Filtered Cases should equal 9').to.be.eql(9)
      expect(filteredCommunityTiers.b2.total, 'Community B2 Filtered Cases should equal 10').to.be.eql(10)
      expect(filteredCommunityTiers.b1.total, 'Community B1 Filtered Cases should equal 11').to.be.eql(11)
      expect(filteredCommunityTiers.a.total, 'Community A Filtered Cases should equal 12').to.be.eql(12)
      expect(filteredCommunityTiers.e.total, 'Community E Filtered Cases should equal 33').to.be.eql(33)
      expect(filteredCommunityTiers.f.total, 'Community F Filtered Cases should equal 34').to.be.eql(34)
      expect(filteredCommunityTiers.g.total, 'Community G Filtered Cases should equal 35').to.be.eql(35)

      const filteredCustodyTiers = omWorkload[0].values.filteredCustodyTiers

      expect(filteredCustodyTiers.untiered.total, 'Custody Untiered Filtered Cases should equal 21').to.be.eql(21)
      expect(filteredCustodyTiers.d2.total, 'Custody D2 Filtered Cases should equal 22').to.be.eql(22)
      expect(filteredCustodyTiers.d1.total, 'Custody D1 Filtered Cases should equal 23').to.be.eql(23)
      expect(filteredCustodyTiers.c2.total, 'Custody C2 Filtered Cases should equal 24').to.be.eql(24)
      expect(filteredCustodyTiers.c1.total, 'Custody C1 Filtered Cases should equal 25').to.be.eql(25)
      expect(filteredCustodyTiers.b2.total, 'Custody B2 Filtered Cases should equal 26').to.be.eql(26)
      expect(filteredCustodyTiers.b1.total, 'Custody B1 Filtered Cases should equal 27').to.be.eql(27)
      expect(filteredCustodyTiers.a.total, 'Custody A Filtered Cases should equal 28').to.be.eql(28)
      expect(filteredCustodyTiers.e.total, 'Custody E Filtered Cases should equal 36').to.be.eql(36)
      expect(filteredCustodyTiers.f.total, 'Custody F Filtered Cases should equal 37').to.be.eql(37)
      expect(filteredCustodyTiers.g.total, 'Custody G Filtered Cases should equal 38').to.be.eql(38)

      const filteredLicenseTiers = omWorkload[0].values.filteredLicenseTiers

      expect(filteredLicenseTiers.untiered.total, 'Licence Untiered Filtered Cases should equal 13').to.be.eql(13)
      expect(filteredLicenseTiers.d2.total, 'Licence D2 Filtered Cases should equal 14').to.be.eql(14)
      expect(filteredLicenseTiers.d1.total, 'Licence D1 Filtered Cases should equal 15').to.be.eql(15)
      expect(filteredLicenseTiers.c2.total, 'Licence C2 Filtered Cases should equal 16').to.be.eql(16)
      expect(filteredLicenseTiers.c1.total, 'Licence C1 Filtered Cases should equal 17').to.be.eql(17)
      expect(filteredLicenseTiers.b2.total, 'Licence B2 Filtered Cases should equal 18').to.be.eql(18)
      expect(filteredLicenseTiers.b1.total, 'Licence B1 Filtered Cases should equal 19').to.be.eql(19)
      expect(filteredLicenseTiers.a.total, 'Licence A Filtered Cases should equal 20').to.be.eql(20)
      expect(filteredLicenseTiers.e.total, 'Licence E Filtered Cases should equal 39').to.be.eql(39)
      expect(filteredLicenseTiers.f.total, 'Licence F Filtered Cases should equal 40').to.be.eql(40)
      expect(filteredLicenseTiers.g.total, 'Licence G Filtered Cases should equal 41').to.be.eql(41)
    })
  })
})

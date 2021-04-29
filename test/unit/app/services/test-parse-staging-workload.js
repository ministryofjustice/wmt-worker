const expect = require('chai').expect
const proxyquire = require('proxyquire')
const sinon = require('sinon')
const stagingWorkload = require('../../../constants/staging-workload')
const armsTotals = require('../../../constants/arms-totals')
const caseDetails = require('../../../constants/case-details')
const locations = require('wmt-probation-rules').Locations

let getStagingWorkload
let getArmsTotals
let getStagingCaseDetails
let parseStagingWorkload

describe('services/parse-staging-workload', function () {
  before(function () {
    getStagingWorkload = sinon.stub().resolves(stagingWorkload)
    getArmsTotals = sinon.stub().resolves(armsTotals)
    getStagingCaseDetails = sinon.stub().resolves(caseDetails)

    parseStagingWorkload = proxyquire('../../../../app/services/parse-staging-workload', {
      './data/get-staging-workload': getStagingWorkload,
      './data/get-arms-totals': getArmsTotals,
      './data/get-staging-case-details': getStagingCaseDetails
    })
  })

  it('should build an OMWorkload object with the correct case totals', function () {
    return parseStagingWorkload([1, 2]).then(function (omWorkload) {
      // This needs extended to test the other case totals for the other tiers
      const filteredCommunityTiers = omWorkload[0].casesSummary.filteredCommunityTiers

      expect(filteredCommunityTiers.location).to.be.eql(locations.COMMUNITY)
      expect(filteredCommunityTiers.untiered, 'Community Untiered Filtered Cases should equal 0').to.be.eql('0')
      expect(filteredCommunityTiers.d0, 'Community D0 Filtered Cases should equal 16').to.be.eql('16')
      expect(filteredCommunityTiers.d1, 'Community D1 Filtered Cases should equal 15').to.be.eql('15')
      expect(filteredCommunityTiers.d2, 'Community D2 Filtered Cases should equal 14').to.be.eql('14')
      expect(filteredCommunityTiers.d3, 'Community D3 Filtered Cases should equal 13').to.be.eql('13')
      expect(filteredCommunityTiers.c0, 'Community C0 Filtered Cases should equal 12').to.be.eql('12')
      expect(filteredCommunityTiers.c1, 'Community C1 Filtered Cases should equal 11').to.be.eql('11')
      expect(filteredCommunityTiers.c2, 'Community C2 Filtered Cases should equal 10').to.be.eql('10')
      expect(filteredCommunityTiers.c3, 'Community C3 Filtered Cases should equal 9').to.be.eql('9')
      expect(filteredCommunityTiers.b0, 'Community B0 Filtered Cases should equal 8').to.be.eql('8')
      expect(filteredCommunityTiers.b1, 'Community B1 Filtered Cases should equal 7').to.be.eql('7')
      expect(filteredCommunityTiers.b2, 'Community B2 Filtered Cases should equal 6').to.be.eql('6')
      expect(filteredCommunityTiers.b3, 'Community B3 Filtered Cases should equal 5').to.be.eql('5')
      expect(filteredCommunityTiers.a0, 'Community A0 Filtered Cases should equal 4').to.be.eql('4')
      expect(filteredCommunityTiers.a1, 'Community A1 Filtered Cases should equal 3').to.be.eql('3')
      expect(filteredCommunityTiers.a2, 'Community A2 Filtered Cases should equal 2').to.be.eql('2')
      expect(filteredCommunityTiers.a3, 'Community A3 Filtered Cases should equal 1').to.be.eql('1')

      const filteredCustodyTiers = omWorkload[0].casesSummary.filteredCustodyTiers
      expect(filteredCustodyTiers.location).to.be.eql(locations.CUSTODY)
      expect(filteredCustodyTiers.untiered, 'Custody Untiered Filtered Cases should equal 40').to.be.eql('40')
      expect(filteredCustodyTiers.d0, 'Custody D0 Filtered Cases should equal 56').to.be.eql('56')
      expect(filteredCustodyTiers.d1, 'Custody D1 Filtered Cases should equal 55').to.be.eql('55')
      expect(filteredCustodyTiers.d2, 'Custody D2 Filtered Cases should equal 54').to.be.eql('54')
      expect(filteredCustodyTiers.d3, 'Custody D3 Filtered Cases should equal 53').to.be.eql('53')
      expect(filteredCustodyTiers.c0, 'Custody C0 Filtered Cases should equal 52').to.be.eql('52')
      expect(filteredCustodyTiers.c1, 'Custody C1 Filtered Cases should equal 51').to.be.eql('51')
      expect(filteredCustodyTiers.c2, 'Custody C2 Filtered Cases should equal 50').to.be.eql('50')
      expect(filteredCustodyTiers.c3, 'Custody C3 Filtered Cases should equal 49').to.be.eql('49')
      expect(filteredCustodyTiers.b0, 'Custody B0 Filtered Cases should equal 48').to.be.eql('48')
      expect(filteredCustodyTiers.b1, 'Custody B1 Filtered Cases should equal 47').to.be.eql('47')
      expect(filteredCustodyTiers.b2, 'Custody B2 Filtered Cases should equal 46').to.be.eql('46')
      expect(filteredCustodyTiers.b3, 'Custody B3 Filtered Cases should equal 45').to.be.eql('45')
      expect(filteredCustodyTiers.a0, 'Custody A0 Filtered Cases should equal 44').to.be.eql('44')
      expect(filteredCustodyTiers.a1, 'Custody A1 Filtered Cases should equal 43').to.be.eql('43')
      expect(filteredCustodyTiers.a2, 'Custody A2 Filtered Cases should equal 42').to.be.eql('42')
      expect(filteredCustodyTiers.a3, 'Custody A3 Filtered Cases should equal 41').to.be.eql('41')

      const filteredLicenseTiers = omWorkload[0].casesSummary.filteredLicenseTiers
      expect(filteredLicenseTiers.location).to.be.eql(locations.LICENSE)
      expect(filteredLicenseTiers.untiered, 'Licence Untiered Filtered Cases should equal 20').to.be.eql('20')
      expect(filteredLicenseTiers.d0, 'Licence D0 Filtered Cases should equal 36').to.be.eql('36')
      expect(filteredLicenseTiers.d1, 'Licence D1 Filtered Cases should equal 35').to.be.eql('35')
      expect(filteredLicenseTiers.d2, 'Licence D2 Filtered Cases should equal 34').to.be.eql('34')
      expect(filteredLicenseTiers.d3, 'Licence D3 Filtered Cases should equal 33').to.be.eql('33')
      expect(filteredLicenseTiers.c0, 'Licence C0 Filtered Cases should equal 32').to.be.eql('32')
      expect(filteredLicenseTiers.c1, 'Licence C1 Filtered Cases should equal 31').to.be.eql('31')
      expect(filteredLicenseTiers.c2, 'Licence C2 Filtered Cases should equal 30').to.be.eql('30')
      expect(filteredLicenseTiers.c3, 'Licence C3 Filtered Cases should equal 29').to.be.eql('29')
      expect(filteredLicenseTiers.b0, 'Licence B0 Filtered Cases should equal 28').to.be.eql('28')
      expect(filteredLicenseTiers.b1, 'Licence B1 Filtered Cases should equal 27').to.be.eql('27')
      expect(filteredLicenseTiers.b2, 'Licence B2 Filtered Cases should equal 26').to.be.eql('26')
      expect(filteredLicenseTiers.b3, 'Licence B3 Filtered Cases should equal 25').to.be.eql('25')
      expect(filteredLicenseTiers.a0, 'Licence A0 Filtered Cases should equal 24').to.be.eql('24')
      expect(filteredLicenseTiers.a1, 'Licence A1 Filtered Cases should equal 23').to.be.eql('23')
      expect(filteredLicenseTiers.a2, 'Licence A2 Filtered Cases should equal 22').to.be.eql('22')
      expect(filteredLicenseTiers.a3, 'Licence A3 Filtered Cases should equal 21').to.be.eql('21')
    })
  })
})

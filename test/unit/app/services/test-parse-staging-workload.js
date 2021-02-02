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
      expect(filteredCommunityTiers.untiered).to.be.eql('32')
      expect(filteredCommunityTiers.d2).to.be.eql('33')
      expect(filteredCommunityTiers.d1).to.be.eql('34')
      expect(filteredCommunityTiers.c2).to.be.eql('35')
      expect(filteredCommunityTiers.c1).to.be.eql('36')
      expect(filteredCommunityTiers.b2).to.be.eql('37')
      expect(filteredCommunityTiers.b1).to.be.eql('38')
      expect(filteredCommunityTiers.a).to.be.eql('39')
      expect(filteredCommunityTiers.e).to.be.eql('97')
      expect(filteredCommunityTiers.f).to.be.eql('96')
      expect(filteredCommunityTiers.g).to.be.eql('95')

      const filteredCustodyTiers = omWorkload[0].casesSummary.filteredCustodyTiers
      expect(filteredCustodyTiers.location).to.be.eql(locations.CUSTODY)
      expect(filteredCustodyTiers.untiered).to.be.eql('48')
      expect(filteredCustodyTiers.d2).to.be.eql('49')
      expect(filteredCustodyTiers.d1).to.be.eql('50')
      expect(filteredCustodyTiers.c2).to.be.eql('51')
      expect(filteredCustodyTiers.c1).to.be.eql('52')
      expect(filteredCustodyTiers.b2).to.be.eql('53')
      expect(filteredCustodyTiers.b1).to.be.eql('54')
      expect(filteredCustodyTiers.a).to.be.eql('55')
      expect(filteredCustodyTiers.e).to.be.eql('103')
      expect(filteredCustodyTiers.f).to.be.eql('102')
      expect(filteredCustodyTiers.g).to.be.eql('101')

      const filteredLicenseTiers = omWorkload[0].casesSummary.filteredLicenseTiers
      expect(filteredLicenseTiers.location).to.be.eql(locations.LICENSE)
      expect(filteredLicenseTiers.untiered).to.be.eql('40')
      expect(filteredLicenseTiers.d2).to.be.eql('41')
      expect(filteredLicenseTiers.d1).to.be.eql('42')
      expect(filteredLicenseTiers.c2).to.be.eql('43')
      expect(filteredLicenseTiers.c1).to.be.eql('44')
      expect(filteredLicenseTiers.b2).to.be.eql('45')
      expect(filteredLicenseTiers.b1).to.be.eql('46')
      expect(filteredLicenseTiers.a).to.be.eql('47')
      expect(filteredLicenseTiers.e).to.be.eql('100')
      expect(filteredLicenseTiers.f).to.be.eql('99')
      expect(filteredLicenseTiers.g).to.be.eql('98')
    })
  })
})

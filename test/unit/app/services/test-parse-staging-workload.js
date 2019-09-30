const expect = require('chai').expect
const proxyquire = require('proxyquire')
const sinon = require('sinon')
const stagingWorkload = require('../../../constants/staging-workload')
const armsTotals = require('../../../constants/arms-totals')
const caseDetails = require('../../../constants/case-details')
const locations = require('wmt-probation-rules').Locations
require('sinon-bluebird')

var getStagingWorkload
var getArmsTotals
var getStagingCaseDetails
var parseStagingWorkload

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
      var filteredCommunityTiers = omWorkload[0].casesSummary.filteredCommunityTiers
      expect(filteredCommunityTiers.location).to.be.eql(locations.COMMUNITY)
      expect(filteredCommunityTiers.untiered).to.be.eql('32')
      expect(filteredCommunityTiers.d2).to.be.eql('33')
      expect(filteredCommunityTiers.d1).to.be.eql('34')
      expect(filteredCommunityTiers.c2).to.be.eql('35')
      expect(filteredCommunityTiers.c1).to.be.eql('36')
      expect(filteredCommunityTiers.b2).to.be.eql('37')
      expect(filteredCommunityTiers.b1).to.be.eql('38')
      expect(filteredCommunityTiers.a).to.be.eql('39')
    })
  })
})

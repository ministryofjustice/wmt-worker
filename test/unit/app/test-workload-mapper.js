const expect = require('chai').expect
const mapWorkload = require('wmt-probation-rules').mapWorkload
const OmWorkload = require('wmt-probation-rules').OmWorkload
const CasesSummary = require('wmt-probation-rules').CasesSummary
const CourtReport = require('wmt-probation-rules').CourtReport
const InstitutionalReport = require('wmt-probation-rules').InstitutionalReport
const Tiers = require('wmt-probation-rules').Tiers
const locations = require('wmt-probation-rules').Locations
const CaseDetails = require('wmt-probation-rules').CaseDetails
const sanitiseLocation = require('../../../app/services/data/helpers/sanitise-location')

var communityTiers
var licenceTiers
var custodyTiers
var t2aCommunityTiers
var t2aLicenceTiers
var t2aCustodyTiers
var instReports
var courtReports
var casesSummary
var workload
var caseDetails = []

describe('Probation Rules map-workload', function () {
  before(function () {
    communityTiers = new Tiers(locations.COMMUNITY, 0, 1, 2, 3, 4, 5, 6, 7)
    licenceTiers = new Tiers(locations.LICENSE, 10, 11, 12, 13, 14, 15, 16, 17)
    custodyTiers = new Tiers(locations.CUSTODY, 20, 21, 22, 23, 24, 25, 26, 27)
    t2aCommunityTiers = new Tiers(locations.COMMUNITY, 20, 21, 22, 23, 24, 25, 26, 27)
    t2aLicenceTiers = new Tiers(locations.LICENSE, 0, 1, 2, 3, 4, 5, 6, 7)
    t2aCustodyTiers = new Tiers(locations.CUSTODY, 10, 11, 12, 13, 14, 15, 16, 17)
    casesSummary = new CasesSummary(
      'NPS', 'NPS North West', 'N01', 'Cheshire', 'N01CHS', 'Chester NPS OMU', 'N01CA3', 'Bloggs', 'Joe', 'NPSM', 'TEST100',
      communityTiers, licenceTiers, custodyTiers, t2aCommunityTiers, t2aLicenceTiers, t2aCustodyTiers, 1, 2, 3, 4
    )
    courtReports = new CourtReport('TEST100', 'NPSM', 5, 6, 7)
    instReports = new InstitutionalReport('TEST100', 'NPSM', 8, 9)
    caseDetails.push(new CaseDetails('L', 'CASEREF1000', 0, 'N01CA3', 'NPSM', 'TEST100', sanitiseLocation(locations.COMMUNITY)))
    caseDetails.push(new CaseDetails('L', 'CASEREF1001', 1, 'N01CA3', 'NPSM', 'TEST100', sanitiseLocation(locations.COMMUNITY)))
    caseDetails.push(new CaseDetails('L', 'CASEREF1002', 1, 'N01CA3', 'NPSM', 'TEST100', sanitiseLocation(locations.COMMUNITY)))
    caseDetails.push(new CaseDetails('L', 'CASEREF1003', 2, 'N01CA3', 'NPSM', 'TEST100', sanitiseLocation(locations.CUSTODY)))
    caseDetails.push(new CaseDetails('L', 'CASEREF1004', 2, 'N01CA3', 'NPSM', 'TEST100', sanitiseLocation(locations.CUSTODY)))
    caseDetails.push(new CaseDetails('L', 'CASEREF1005', 3, 'N01CA3', 'NPSM', 'TEST100', sanitiseLocation(locations.CUSTODY)))
    caseDetails.push(new CaseDetails('L', 'CASEREF1006', 4, 'N01CA3', 'NPSM', 'TEST100', sanitiseLocation(locations.LICENSE)))
    caseDetails.push(new CaseDetails('L', 'CASEREF1007', 4, 'N01CA3', 'NPSM', 'TEST100', sanitiseLocation(locations.LICENSE)))
    caseDetails.push(new CaseDetails('L', 'CASEREF1008', 5, 'N01CA3', 'NPSM', 'TEST100', sanitiseLocation(locations.LICENSE)))
    caseDetails.push(new CaseDetails('L', 'CASEREF1009', 7, 'N01CA3', 'NPSM', 'TEST100', sanitiseLocation(locations.LICENSE)))
    caseDetails.push(new CaseDetails('L', 'CASEREF1010', 7, 'N01CA3', 'NPSM', 'TEST100', sanitiseLocation(locations.LICENSE)))
    caseDetails.push(new CaseDetails('L', 'CASEREF1011', 7, 'N01CA3', 'NPSM', 'TEST100', sanitiseLocation(locations.LICENSE)))
    caseDetails.push(new CaseDetails('L', 'CASEREF1012', 6, 'N01CA3', 'NPSM', 'TEST100', sanitiseLocation(locations.LICENSE)))
    caseDetails.push(new CaseDetails('L', 'CASEREF1013', 6, 'N01CA3', 'NPSM', 'TEST100', sanitiseLocation(locations.LICENSE)))
    caseDetails.push(new CaseDetails('L', 'CASEREF1014', 6, 'N01CA3', 'NPSM', 'TEST100', sanitiseLocation(locations.LICENSE)))
    caseDetails.push(new CaseDetails('L', 'CASEREF1015', 6, 'N01CA3', 'NPSM', 'TEST100', sanitiseLocation(locations.LICENSE)))
    caseDetails.push(new CaseDetails('L', 'CASEREF1016', 6, 'N01CA3', 'NPSM', 'TEST100', sanitiseLocation(locations.LICENSE)))
    workload = new OmWorkload(2019, casesSummary, courtReports, instReports, caseDetails)
  })

  it('should create a valid mapped workload with the correcy Suspended Lifer Totals', function () {
    var mappedWorkloads = mapWorkload(workload, 22, 6)
    expect(mappedWorkloads.communityTiers.untiered.suspendedLifers, 'Untiered Community Suspended Lifers total should equal 1').to.be.equal(1)
    expect(mappedWorkloads.communityTiers.d2.suspendedLifers, 'D2 Community Suspended Lifers total should equal 2').to.be.equal(2)
    expect(mappedWorkloads.custodyTiers.d1.suspendedLifers, 'D1 Custody Suspended Lifers total should equal 2').to.be.equal(2)
    expect(mappedWorkloads.custodyTiers.c2.suspendedLifers, 'C2 Custody Suspended Lifers total should equal 1').to.be.equal(1)
    expect(mappedWorkloads.licenseTiers.c1.suspendedLifers, 'C1 Licence Suspended Lifers total should equal 1').to.be.equal(2)
    expect(mappedWorkloads.licenseTiers.b2.suspendedLifers, 'B2 Licence Suspended Lifers total should equal 1').to.be.equal(1)
    expect(mappedWorkloads.licenseTiers.b1.suspendedLifers, 'B2 Licence Suspended Lifers total should equal 3').to.be.equal(5)
    expect(mappedWorkloads.licenseTiers.a.suspendedLifers, 'A Licence Suspended Lifers total should equal 3').to.be.equal(3)
  })
})
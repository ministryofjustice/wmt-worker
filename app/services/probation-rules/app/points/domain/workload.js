const assertObjectType = require('./validation/assert-object-type')
const assertNumber = require('./validation/assert-number')
const Tiers = require('./tiers.js')

class Workload {
  constructor (workloadOwnerId, totalCases, totalT2aCases, monthlySdrs,
    sdrsDueNext30Days, sdrConversionsLast30Days,
    paromsCompletedLast30Days, paromsDueNext30Days,
    custodyTiers, communityTiers, licenseTiers,
    t2aCustodyTiers, t2aCommunityTiers, t2aLicenseTiers,
    licenseCasesLast16Weeks, communityCasesLast16Weeks,
    armsCommunityCases, armsLicenseCases,
    stagingId, workloadReportId, filteredCommunityTiers,
    filteredCustodyTiers, filteredLicenseTiers, totalFilteredCases) {
    this.workloadOwnerId = workloadOwnerId
    this.totalCases = totalCases
    this.totalT2aCases = totalT2aCases
    this.monthlySdrs = monthlySdrs
    this.sdrsDueNext30Days = sdrsDueNext30Days
    this.sdrConversionsLast30Days = sdrConversionsLast30Days
    this.paromsCompletedLast30Days = paromsCompletedLast30Days
    this.paromsDueNext30Days = paromsDueNext30Days
    this.custodyTiers = custodyTiers
    this.communityTiers = communityTiers
    this.licenseTiers = licenseTiers
    this.t2aCustodyTiers = t2aCustodyTiers
    this.t2aCommunityTiers = t2aCommunityTiers
    this.t2aLicenseTiers = t2aLicenseTiers
    this.licenseCasesLast16Weeks = licenseCasesLast16Weeks
    this.communityCasesLast16Weeks = communityCasesLast16Weeks
    this.armsCommunityCases = armsCommunityCases
    this.armsLicenseCases = armsLicenseCases
    this.stagingId = stagingId
    this.workloadReportId = workloadReportId
    this.filteredCommunityTiers = filteredCommunityTiers
    this.filteredCustodyTiers = filteredCustodyTiers
    this.filteredLicenseTiers = filteredLicenseTiers
    this.totalFilteredCases = totalFilteredCases
    this.isValid()
  }

  isValid () {
    assertNumber(this.workloadOwnerId, 'Workload Owner Id')
    assertNumber(this.totalCases, 'Total Cases')
    assertNumber(this.totalT2aCases, 'Total T2A Cases')
    assertNumber(this.monthlySdrs, 'Monthly SDRs')
    assertNumber(this.sdrsDueNext30Days, 'SDRs Due Next 30 Days')
    assertNumber(this.sdrConversionsLast30Days, 'SDR Conversions Last 30 Days')
    assertNumber(this.paromsCompletedLast30Days, 'PAROMS Completed Last 30 Days')
    assertNumber(this.paromsDueNext30Days, 'PAROMS Due Next 30 Days')
    assertObjectType(this.custodyTiers, Tiers, 'Custody Tiers')
    assertObjectType(this.communityTiers, Tiers, 'Community Tiers')
    assertObjectType(this.licenseTiers, Tiers, 'License Tiers')
    assertObjectType(this.t2aCustodyTiers, Tiers, 'Custody Tiers')
    assertObjectType(this.t2aCommunityTiers, Tiers, 'Community Tiers')
    assertObjectType(this.t2aLicenseTiers, Tiers, 'License Tiers')
    assertNumber(this.licenseCasesLast16Weeks, 'License Cases Last 16 Weeks')
    assertNumber(this.communityCasesLast16Weeks, 'Community Cases Last 16 Weeks')
    assertNumber(this.armsCommunityCases, 'ARMS Community Cases')
    assertNumber(this.armsLicenseCases, 'ARMS License Cases')
    assertNumber(this.stagingId, 'Staging ID')
    assertNumber(this.workloadReportId, 'Workload Report ID')
    assertObjectType(this.filteredCustodyTiers, Tiers, 'Filtered Custody Tiers')
    assertObjectType(this.filteredCommunityTiers, Tiers, 'Filtered Community Tiers')
    assertObjectType(this.filteredLicenseTiers, Tiers, 'Filtered License Tiers')
    assertNumber(this.totalFilteredCases, 'Total Filtered Cases')
  }
}

module.exports = Workload

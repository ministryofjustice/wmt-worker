const StagingWorkload = require('../staging/domain/om-workload')
const Workload = require('../points/domain/workload')
const Locations = require('../staging/constants/locations')
const zeroIfNull = require('./helpers/zero-if-null')

const mapTiers = require('./tiers')
const assertObjectType = require('../points/domain/validation/assert-object-type')
const assertNumber = require('../points/domain/validation/assert-number')

module.exports = function (stagingWorkload, workloadOwnerId, workloadReportId) {
  assertObjectType(stagingWorkload, StagingWorkload, 'StagingWorkload')
  assertNumber(workloadOwnerId, 'Workload Owner Id')
  assertNumber(workloadReportId, 'Workload Report Id')

  const monthlySdrs = zeroIfNull(stagingWorkload.courtReports.sdrLast30)
  const sdrsDueNext30Days = zeroIfNull(stagingWorkload.courtReports.sdrDueNext30)
  const sdrsConversionsLast30Days = zeroIfNull(stagingWorkload.courtReports.sdrConvLast30)

  const paromsCompletedLast30Days = zeroIfNull(stagingWorkload.instReports.paromCompLast30)
  const paromsDueNext30Days = zeroIfNull(stagingWorkload.instReports.paromDueNext30)

  const communityCaseDetails = stagingWorkload.caseDetails.filter(locationFilter(Locations.COMMUNITY))
  const custodyCaseDetails = stagingWorkload.caseDetails.filter(locationFilter(Locations.CUSTODY))
  const licenseCaseDetails = stagingWorkload.caseDetails.filter(locationFilter(Locations.LICENSE))

  const communitySummary = stagingWorkload.casesSummary.communityTiers
  const custodySummary = stagingWorkload.casesSummary.custodyTiers
  const licenseSummary = stagingWorkload.casesSummary.licenseTiers

  const filteredCommunitySummary = stagingWorkload.casesSummary.filteredCommunityTiers
  const filteredCustodySummary = stagingWorkload.casesSummary.filteredCustodyTiers
  const filteredLicenseSummary = stagingWorkload.casesSummary.filteredLicenseTiers

  const communityTiers = mapTiers(communitySummary, communityCaseDetails)
  const custodyTiers = mapTiers(custodySummary, custodyCaseDetails)
  const licenseTiers = mapTiers(licenseSummary, licenseCaseDetails)

  const filteredCommunityTiers = mapTiers(filteredCommunitySummary, communityCaseDetails)
  const filteredCustodyTiers = mapTiers(filteredCustodySummary, custodyCaseDetails)
  const filteredLicenseTiers = mapTiers(filteredLicenseSummary, licenseCaseDetails)

  const t2aCommunitySummary = stagingWorkload.casesSummary.t2aCommunityTiers
  const t2aCustodySummary = stagingWorkload.casesSummary.t2aCustodyTiers
  const t2aLicenseSummary = stagingWorkload.casesSummary.t2aLicenseTiers

  const t2aCommunityTiers = mapTiers(t2aCommunitySummary, communityCaseDetails, true)
  const t2aCustodyTiers = mapTiers(t2aCustodySummary, custodyCaseDetails, true)
  const t2aLicenseTiers = mapTiers(t2aLicenseSummary, licenseCaseDetails, true)

  const licenseCasesLast16Weeks = zeroIfNull(stagingWorkload.casesSummary.licIn1st16Weeks)
  const communityCasesLast16Weeks = zeroIfNull(stagingWorkload.casesSummary.comIn1st16Weeks)

  const armsCommunityCases = zeroIfNull(stagingWorkload.casesSummary.armsCommunityCases)
  const armsLicenseCases = zeroIfNull(stagingWorkload.casesSummary.armsLicenseCases)

  const totalT2aCases = t2aCommunityTiers.total + t2aCustodyTiers.total + t2aLicenseTiers.total
  const totalCases = communityTiers.total + custodyTiers.total + licenseTiers.total + totalT2aCases
  const totalFilteredCases = filteredCommunityTiers.total + filteredCustodyTiers.total + filteredLicenseTiers.total

  const stagingId = stagingWorkload.stagingId

  return new Workload(
    workloadOwnerId,
    totalCases,
    totalT2aCases,
    monthlySdrs,
    sdrsDueNext30Days,
    sdrsConversionsLast30Days,
    paromsCompletedLast30Days,
    paromsDueNext30Days,
    custodyTiers,
    communityTiers,
    licenseTiers,
    t2aCustodyTiers,
    t2aCommunityTiers,
    t2aLicenseTiers,
    licenseCasesLast16Weeks,
    communityCasesLast16Weeks,
    armsCommunityCases,
    armsLicenseCases,
    stagingId,
    workloadReportId,
    filteredCommunityTiers,
    filteredCustodyTiers,
    filteredLicenseTiers,
    totalFilteredCases
  )
}

const locationFilter = function (location) {
  return function (element) {
    return element.location.toUpperCase() === location
  }
}

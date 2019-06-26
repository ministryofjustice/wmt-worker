const getCaseload = require('./data/get-caseload')
const caseloadHelper = require('./helpers/caseload-helper')
const caseType = require('../constants/case-type')

module.exports = function () {

  return getCaseload()
    .then(function (results) {
      var caseloadResults = parseCaseloadResults(results)
      return {
        caseloadDetails: caseloadResults
      }
    })
}

var parseCaseloadResults = function (results) {
  // Overall cases
  var allTotals = caseloadHelper.totalAllCases(results)
  var caseloadGroupedByGrade = caseloadHelper.groupCaseloadByGrade(results)
  var overallPercentages = caseloadHelper.calculateOverallPercentages(allTotals, caseloadGroupedByGrade)

  var overallResults = caseloadHelper.getCaseloadTierTotalsByTeamByGrade(results)
  var overallSummary = caseloadHelper.getCaseloadSummaryTotalsByTeam(results)
  // Custody cases
  var custodyResults = caseloadHelper.getCaseloadByType(results, caseType.CUSTODY)
  var custodySummary = caseloadHelper.getCaseloadTotalSummary(custodyResults)
  // Community cases
  var communityResults = caseloadHelper.getCaseloadByType(results, caseType.COMMUNITY)
  var communitySummary = caseloadHelper.getCaseloadTotalSummary(communityResults)
  // License cases
  var licenseResults = caseloadHelper.getCaseloadByType(results, caseType.LICENSE)
  var licenseSummary = caseloadHelper.getCaseloadTotalSummary(licenseResults)

  var custodyTotals = caseloadHelper.totalAllCases(custodyResults)
  var custodyGroupedByGrade = caseloadHelper.groupCaseloadByGrade(custodyResults)
  var custodyPercentages = caseloadHelper.calculateOverallPercentages(custodyTotals, custodyGroupedByGrade)

  var communityTotals = caseloadHelper.totalAllCases(communityResults)
  var communityGroupedByGrade = caseloadHelper.groupCaseloadByGrade(communityResults)
  var communityPercentages = caseloadHelper.calculateOverallPercentages(communityTotals, communityGroupedByGrade)

  var licenseTotals = caseloadHelper.totalAllCases(licenseResults)
  var licenseGroupedByGrade = caseloadHelper.groupCaseloadByGrade(licenseResults)
  var licensePercentages = caseloadHelper.calculateOverallPercentages(licenseTotals, licenseGroupedByGrade)

  overallResults = caseloadHelper.calculateTeamTierPercentages(overallResults)
  replaceIncorrectPercentageAverages(overallResults.percentageTotals, overallPercentages)

  custodyResults = caseloadHelper.aggregateTeamTierTotals(custodyResults)
  replaceIncorrectPercentageAverages(custodyResults.percentageTotals, custodyPercentages)

  communityResults = caseloadHelper.aggregateTeamTierTotals(communityResults)
  replaceIncorrectPercentageAverages(communityResults.percentageTotals, communityPercentages)

  licenseResults = caseloadHelper.aggregateTeamTierTotals(licenseResults)
  replaceIncorrectPercentageAverages(licenseResults.percentageTotals, licensePercentages)

  var caseloadResults = {
    overallCaseloadDetails: overallResults,
    communityCaseloadDetails: communityResults,
    custodyCaseloadDetails: custodyResults,
    licenseCaseloadDetails: licenseResults,
    overallTotalSummary: overallSummary,
    custodyTotalSummary: custodySummary,
    communityTotalSummary: communitySummary,
    licenseTotalSummary: licenseSummary
  }
  return caseloadResults
}

var replaceIncorrectPercentageAverages = function (originalPercentageTotals, correctPercentages) {
  var keys = Object.keys(originalPercentageTotals)
  keys.forEach(function (key) {
    originalPercentageTotals[key].a = correctPercentages[key].a
    originalPercentageTotals[key].b1 = correctPercentages[key].b1
    originalPercentageTotals[key].b2 = correctPercentages[key].b2
    originalPercentageTotals[key].c1 = correctPercentages[key].c1
    originalPercentageTotals[key].c2 = correctPercentages[key].c2
    originalPercentageTotals[key].d1 = correctPercentages[key].d1
    originalPercentageTotals[key].d2 = correctPercentages[key].d2
    originalPercentageTotals[key].untiered = correctPercentages[key].untiered
    originalPercentageTotals[key].totalCases = correctPercentages[key].totalCases
  })
}

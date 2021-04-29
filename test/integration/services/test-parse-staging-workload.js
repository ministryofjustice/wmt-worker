const expect = require('chai').expect
const parseStagingWorkload = require('../../../app/services/parse-staging-workload')
const workloadHelper = require('../../helpers/data/staging-workload-helper')
const caseDetailsHelper = require('../../helpers/data/staging-case-details-helper')

describe('services/parse-staging-workload', function () {
  const testOmKey = (Math.random() * 1000).toString()
  const courtReport = workloadHelper.getTestCourtReport(testOmKey)
  const institutionReport = workloadHelper.getTestInstitutionalReport(testOmKey)
  const armsData = workloadHelper.getArmsData(testOmKey)
  const caseSummaryReport = workloadHelper.getTestCaseSummary(testOmKey)
  let insertedRecords = []

  before(function () {
    return workloadHelper.insertCaseSummaryReport(caseSummaryReport, insertedRecords)
      .then(function (inserts) {
        return workloadHelper.insertFilteredCaseSummaryReport(caseSummaryReport, inserts)
      })
      .then(function (inserts) {
        return workloadHelper.insertT2aCaseSummaryReport(caseSummaryReport, inserts)
      })
      .then(function (inserts) {
        return workloadHelper.insertCourtReport(courtReport, inserts)
      })
      .then(function (inserts) {
        return workloadHelper.insertInstitutionalReport(institutionReport, inserts)
      })
      .then(function (inserts) {
        return workloadHelper.insertArms(armsData, inserts)
      })
      .then(function (inserts) {
        return caseDetailsHelper.insertOverdueTermination(inserts)
      })
      .then(function (inserts) {
        return caseDetailsHelper.insertPriority(inserts)
      })
      .then(function (inserts) {
        return caseDetailsHelper.insertUnpaidWork(inserts)
      })
      .then(function (inserts) {
        return caseDetailsHelper.insertWarrant(inserts)
      })
      .then(function (inserts) {
        insertedRecords = inserts
      })
  })

  it('should return the union of all staged case details', function () {
    const workloads = insertedRecords.filter((item) => item.table === 'wmt_extract')
    const firstId = workloads[0].id
    const lastId = parseInt(firstId) + workloads.length
    caseSummaryReport.armsCommunityCases = 3
    caseSummaryReport.armsLicenseCases = 2

    return parseStagingWorkload([firstId, lastId])
      .then(function (omWorkload) {
        expect(omWorkload.length).to.be.equal(1)
        expect(omWorkload[0].casesSummary).to.deep.eq(caseSummaryReport)
        expect(omWorkload[0].courtReports).to.deep.eq(Object.assign({}, courtReport, { oralReports: undefined }))
        expect(omWorkload[0].instReports).to.deep.eq(institutionReport)
      })
  })

  after(function () {
    return caseDetailsHelper.deleteAll(insertedRecords)
  })
})

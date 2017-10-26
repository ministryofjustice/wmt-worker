const expect = require('chai').expect
const getStagingWorkload = require('../../../../app/services/data/get-staging-workload')
const workloadHelper = require('../../../helpers/data/staging-workload-helper')
const caseDetailsHelper = require('../../../helpers/data/staging-case-details-helper')

describe('services/data/get-staging-workload', function () {
  const testOmKey = (Math.random() * 1000).toString()
  const courtReport = workloadHelper.getTestCourtReport(testOmKey)
  const institutionReport = workloadHelper.getTestInstitutionalReport(testOmKey)
  const armsData = workloadHelper.getArmsData(testOmKey)
  var caseSummaryReport = workloadHelper.getTestCaseSummary(testOmKey)
  var insertedRecords = []

  before(function () {
    return workloadHelper.insertCaseSummaryReport(caseSummaryReport, insertedRecords)
    .then(function (inserts) {
      return workloadHelper.insertT2aCaseSummaryReport(caseSummaryReport, insertedRecords)
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
    var workloads = insertedRecords.filter((item) => item.table === 'wmt_extract')
    var firstId = workloads[0].id
    var lastId = parseInt(firstId) + workloads.length
    caseSummaryReport.armsCommunityCases = 3
    caseSummaryReport.armsLicenseCases = 2

    return getStagingWorkload([firstId, lastId])
    .then(function (omWorkload) {
      expect(omWorkload.length).to.be.equal(1)
      expect(omWorkload[0].casesSummary).to.deep.eq(caseSummaryReport)
      expect(omWorkload[0].courtReports).to.deep.eq(Object.assign({}, courtReport, { oralReports: undefined }))
      expect(omWorkload[0].instReports).to.deep.eq(institutionReport)
    })
  })

  after(function (done) {
    caseDetailsHelper.deleteAll(insertedRecords)
        .then(() => done())
  })
})

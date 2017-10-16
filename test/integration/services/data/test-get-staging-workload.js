const expect = require('chai').expect
const getStagingWorkload = require('../../../../app/services/data/get-staging-workload')
const workloadHelper = require('../../../helpers/data/staging-workload-helper')
const caseDetailsHelper = require('../../../helpers/data/staging-case-details-helper')

describe('services/data/get-staging-workload', function () {
  const testOmKey = (Math.random() * 1000).toString()
  const caseSummaryReport = workloadHelper.getTestCaseSummary(testOmKey)
  const courtReport = workloadHelper.getTestCourtReport(testOmKey)
  const institutionReport = workloadHelper.getTestInstitutionalReport(testOmKey)
  var insertedRecords = []

  before(function () {
    return workloadHelper.insertCaseSummaryReport(caseSummaryReport, insertedRecords)
    .then(function (inserts) {
      return workloadHelper.insertCaseSummaryReport(caseSummaryReport, insertedRecords, true)
    })
    .then(function (inserts) {
      return workloadHelper.insertCourtReport(courtReport, inserts)
    })
    .then(function (inserts) {
      return workloadHelper.insertInstitutionalReport(institutionReport, inserts)
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

  it('should return the union of all staged case details', function (done) {
    var workloads = insertedRecords.filter((item) => item.table === 'wmt_extract')
    var firstId = workloads[0].id
    var lastId = firstId + workloads.length
    getStagingWorkload([firstId, lastId])
    .then(function (omWorkload) {
      expect(omWorkload.length).to.be.equal(1)
      expect(omWorkload[0].casesSummary).to.deep.eq(caseSummaryReport)
      expect(omWorkload[0].courtReports).to.deep.eq(courtReport)
      expect(omWorkload[0].instReports).to.deep.eq(institutionReport)
      done()
    })
  })

  after(function (done) {
    caseDetailsHelper.deleteAll(insertedRecords)
        .then(() => done())
  })
})

const expect = require('chai').expect
const getStagingWorkload = require('../../../../app/services/data/get-staging-workload')
const workloadHelper = require('../../../helpers/data/staging-workload-helper')
const caseDetailsHelper = require('../../../helpers/data/staging-case-details-helper')

describe('services/data/get-staging-workload', function () {
  var caseSummaryReport, courtReport, institutionReport

  before(function () {
    return workloadHelper.insertCaseSummaryReport()
    .then(function (result) {
      caseSummaryReport = result
      return workloadHelper.insertCourtReport()
    })
    .then(function (result) {
      courtReport = result
      return workloadHelper.insertInstitutionalReport()
    })
    .then(function (result) {
      institutionReport = result
      return caseDetailsHelper.insertOverdueTermination()
    })
    .then(function () {
      return caseDetailsHelper.insertPriority()
    })
    .then(function () {
      return caseDetailsHelper.insertUnpaidWork()
    })
    .then(function () {
       return caseDetailsHelper.insertWarrant()
    })
  })

  it('should return the union of all staged case details', function (done) {
    getStagingWorkload([0, 999])
      .then(function (omWorkload) {
        expect(omWorkload.length).to.be.equal(1)
        expect(omWorkload[0].casesSummary).to.deep.eq(caseSummaryReport)
        expect(omWorkload[0].courtReports).to.deep.eq(courtReport)
        expect(omWorkload[0].instReports).to.deep.eq(institutionReport)
        done()
      })

      // make omKey dynamic and dont lose link between records
      // add casedetails
  })

  after(function () {
    workloadHelper.deleteAll()
    return caseDetailsHelper.deleteAll()
  })
})

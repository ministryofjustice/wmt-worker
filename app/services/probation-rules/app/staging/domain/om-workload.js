class OmWorkload {
  constructor (stagingId, casesSummary, courtReports, instReports, caseDetails, workloadId) {
    this.stagingId = stagingId
    this.casesSummary = casesSummary
    this.courtReports = courtReports
    this.instReports = instReports
    this.caseDetails = caseDetails
  }
}

module.exports = OmWorkload

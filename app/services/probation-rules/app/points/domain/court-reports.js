const assertNumber = require('./validation/assert-number')

class CourtReports {
  constructor (workloadOwnerId, totalSdrs, totalFdrs, totalOralReports, stagingId, workloadReportId) {
    this.workloadOwnerId = workloadOwnerId
    this.totalSdrs = totalSdrs
    this.totalFdrs = totalFdrs
    this.totalOralReports = totalOralReports
    this.stagingId = stagingId
    this.workloadReportId = workloadReportId
    this.isValid()
  }

  isValid () {
    assertNumber(this.workloadOwnerId, 'Workload Owner Id')
    assertNumber(this.totalSdrs, 'Total SDRs')
    assertNumber(this.totalFdrs, 'Total FDRs')
    assertNumber(this.totalOralReports, 'Total Oral Reports')
    assertNumber(this.stagingId, 'Staging ID')
    assertNumber(this.workloadReportId, 'Workload Report ID')
  }
}

module.exports = CourtReports

class CaseDetails {
  constructor (rowType, caseRefNo, tierCode, teamCode, omGradeCode, omKey, location, workloadId) {
    this.rowType = rowType
    this.caseRefNo = caseRefNo
    this.tierCode = tierCode
    this.teamCode = teamCode
    this.omGradeCode = omGradeCode
    this.omKey = omKey
    this.location = location
  }
}

module.exports = CaseDetails

const CaseDetails = require('../../app/services/probation-rules').CaseDetails

module.exports = [
  new CaseDetails('W', 'CASEREF9000', '6', 'TEAM001', 'PO', 'OM9000', 'LICENSE'),
  new CaseDetails('L', 'CASEREF9001', '5', 'TEAM001', 'PO', 'OM9000', 'COMMUNITY'),
  new CaseDetails('S', 'CASEREF9002', '4', 'TEAM001', 'PO', 'OM9000', 'CUSTODY'),
  new CaseDetails('P', 'CASEREF9003', '3', 'TEAM001', 'PO', 'OM9000', 'LICENSE')
]

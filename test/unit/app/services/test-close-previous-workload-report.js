const expect = require('chai').expect
const proxyquire = require('proxyquire')
const sinon = require('sinon')

let getOpenWorkloadReports
let updateWorkloadEffectiveTo
let closePreviousWorkloadReport

const now = new Date()
const past = now.setMonth(now.getMonth() - 2)
const newWorkloadReportId = 12
const previousWorkloadReportId = 3

const currentWorkloads = [
  {
    id: newWorkloadReportId,
    effective_from: now
  },
  {
    id: previousWorkloadReportId,
    effective_from: past
  }
]

describe('services/close-previous-workload-report', function () {
  before(function () {
    getOpenWorkloadReports = sinon.stub()
    updateWorkloadEffectiveTo = sinon.stub()

    closePreviousWorkloadReport = proxyquire('../../../../app/services/close-previous-workload-report', {
      './data/get-open-workload-reports': getOpenWorkloadReports,
      './data/update-workload-report-effective-to': updateWorkloadEffectiveTo
    })
  })

  it('should call get-open-workload-reports and update-workload-report-effective-to', function () {
    getOpenWorkloadReports.resolves(currentWorkloads)
    updateWorkloadEffectiveTo.resolves()
    return closePreviousWorkloadReport(newWorkloadReportId).then(function () {
      expect(getOpenWorkloadReports.called).to.be.true //eslint-disable-line
      expect(updateWorkloadEffectiveTo.calledWith(previousWorkloadReportId, now)).to.be.true //eslint-disable-line
    })
  })
})

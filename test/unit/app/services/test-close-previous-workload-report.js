const expect = require('chai').expect
const proxyquire = require('proxyquire')
const sinon = require('sinon')
require('sinon-bluebird')

var getOpenWorkloadReport
var updateWorkloadEffectiveTo
var closePreviousWorkloadReport

var now = new Date()
var past = now.setMonth(now.getMonth() - 2)
var newWorkloadReportId = 12
var previousWorkloadReportId = 3

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

describe('services/task-counter', function () {
  before(function (done) {
    getOpenWorkloadReport = sinon.stub()
    updateWorkloadEffectiveTo = sinon.stub()

    closePreviousWorkloadReport = proxyquire('../../../../app/services/close-previous-workload-report', {
      './data/get-open-workload-report': getOpenWorkloadReport,
      './data/update-workload-report-effective-to': updateWorkloadEffectiveTo
    })
    done()
  })

  it('should call get-open-workload-report and update-workload-report-effective-to', function (done) {
    getOpenWorkloadReport.resolves(currentWorkloads)
    updateWorkloadEffectiveTo.resolves()
    closePreviousWorkloadReport(newWorkloadReportId).then(function () {
      expect(getOpenWorkloadReport.called).to.be.true //eslint-disable-line
      expect(updateWorkloadEffectiveTo.calledWith(previousWorkloadReportId, now)).to.be.true //eslint-disable-line
      done()
    })
  })
})

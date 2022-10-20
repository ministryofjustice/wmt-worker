/* eslint no-unused-expressions: 0 */
const expect = require('chai').expect
const proxyquire = require('proxyquire')
const sinon = require('sinon')

let getWorkloadReportById
let recordEtlExecutionTime
let log

const now = new Date()
const newWorkloadReportId = 12

const currentWorkloads = [
  {
    id: newWorkloadReportId,
    effective_from: now
  }
]

describe('services/record-etl-execution-time', function () {
  before(function () {
    getWorkloadReportById = sinon.stub()
    const getTotalCaseCount = sinon.stub()
    getTotalCaseCount.resolves({})
    log = { trackExecutionTime: sinon.stub(), trackTotalCases: sinon.stub(), info: sinon.stub(), error: function (message) {}, jobError: sinon.stub() }
    recordEtlExecutionTime = proxyquire('../../../../app/services/record-etl-execution-time', {
      './data/get-workload-report-by-id': getWorkloadReportById,
      './log': log,
      './data/get-total-case-count': getTotalCaseCount
    })
  })

  it('should call get-workload-report-by-id and update-workload-report-effective-to', function () {
    getWorkloadReportById.resolves(currentWorkloads)
    return recordEtlExecutionTime(newWorkloadReportId).then(function () {
      expect(getWorkloadReportById.calledWith(newWorkloadReportId)).to.be.true
      expect(log.trackExecutionTime.calledWith('NART Extract', sinon.match.number, true)).to.be.true
    })
  })
})

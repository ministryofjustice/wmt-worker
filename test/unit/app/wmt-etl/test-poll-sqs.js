
const sinon = require('sinon')
const proxyquire = require('proxyquire')
const { expect } = require('chai')

describe('poll-sqs', function () {
  let pollSqs
  let log

  beforeEach(function () {
    log = { jobError: sinon.stub() }
    const sqsClientWillFail = function () { return Promise.reject(new Error('Expected SQS error')) }
    pollSqs = proxyquire('../../../../app/wmt-etl/poll-sqs', {
      '../services/log': log,
      '../services/aws/sqs/receive-sqs-message': sqsClientWillFail
    })
  })

  it('logs job errors', function () {
    return pollSqs().then(function () {
      return expect(log.jobError.calledWith('RUN-ETL')).to.be.true
    })
  })
})

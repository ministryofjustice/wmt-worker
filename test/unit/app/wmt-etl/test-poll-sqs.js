
const sinon = require('sinon')
const proxyquire = require('proxyquire')
const { expect } = require('chai')

describe('poll-sqs', function () {
  let pollSqs
  let log
  let receiveSqsMessage
  let deleteSqsMessage
  let listObjects
  let runEtl
  let getHasBeenRead

  beforeEach(function () {
    log = { jobError: sinon.stub() }
    receiveSqsMessage = sinon.stub()
    deleteSqsMessage = sinon.stub()
    deleteSqsMessage.resolves(true)
    listObjects = sinon.stub()
    runEtl = sinon.stub()
    getHasBeenRead = sinon.stub()
    pollSqs = proxyquire('../../../../app/wmt-etl/poll-sqs', {
      '../services/log': log,
      '../services/aws/sqs/receive-sqs-message': receiveSqsMessage,
      '../services/aws/sqs/delete-sqs-message': deleteSqsMessage,
      '../services/aws/s3/list-s3-objects': listObjects,
      './get-has-been-read': getHasBeenRead,
      './run-etl': runEtl
    })
  })

  it('logs job errors', function () {
    receiveSqsMessage.rejects()
    return pollSqs().then(function () {
      return expect(log.jobError.calledWith('RUN-ETL')).to.be.true
    })
  })

  it('must not run etl when only one file present', function () {
    receiveSqsMessage.resolves({ Messages: [{ ReceiptHandle: {} }] })
    listObjects.resolves([{}])
    return pollSqs().then(function (result) {
      return expect(result).to.equal('Only one file updated')
    })
  })

  it('must not run when one file has already been read', function () {
    receiveSqsMessage.resolves({ Messages: [{ ReceiptHandle: {} }] })
    listObjects.resolves([{ Key: '1', LastModified: new Date() }, { Key: '2', LastModified: new Date() }])
    getHasBeenRead.withArgs('1').resolves(true)
    getHasBeenRead.withArgs('2').resolves(false)
    return pollSqs().then(function (result) {
      return expect(result).to.equal('Files have been read')
    })
  })

  it('must run when both files have not been read', function () {
    receiveSqsMessage.resolves({ Messages: [{ ReceiptHandle: {} }] })
    listObjects.resolves([{ Key: '1', LastModified: new Date() }, { Key: '2', LastModified: new Date() }])
    getHasBeenRead.resolves(false)
    runEtl.resolves(true)
    return pollSqs().then(function (result) {
      return expect(result).to.be.true
    })
  })
})

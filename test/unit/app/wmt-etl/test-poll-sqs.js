const sinon = require('sinon')
const proxyquire = require('proxyquire')
const { expect } = require('chai')
const { S3 } = require('../../../../etl-config')

describe('poll-sqs', function () {
  let pollSqs
  let log
  let receiveSqsMessage
  let deleteSqsMessage
  let listObjects
  let runEtl
  let getHasBeenRead
  let getTasksNotCompleteCount

  beforeEach(function () {
    log = { jobError: sinon.stub() }
    receiveSqsMessage = sinon.stub()
    deleteSqsMessage = sinon.stub()
    deleteSqsMessage.resolves(true)
    listObjects = sinon.stub()
    runEtl = sinon.stub()
    getHasBeenRead = sinon.stub()
    getTasksNotCompleteCount = sinon.stub()
    getTasksNotCompleteCount.resolves([{ theCount: 0 }])
    pollSqs = proxyquire('../../../../app/wmt-etl/poll-sqs', {
      '../services/log': log,
      '../services/aws/sqs/receive-sqs-message': receiveSqsMessage,
      '../services/aws/sqs/delete-sqs-message': deleteSqsMessage,
      '../services/aws/s3/list-s3-objects': listObjects,
      './get-has-been-read': getHasBeenRead,
      './run-etl': runEtl,
      '../services/data/get-tasks-not-complete-count': getTasksNotCompleteCount
    })
  })

  it('logs job errors', function () {
    receiveSqsMessage.rejects()
    return pollSqs().then(function () {
      return expect(log.jobError.calledWith('RUN-ETL')).to.be.true
    })
  })

  it('must not run etl when PS file is not present', function () {
    receiveSqsMessage.resolves({ Messages: [{ ReceiptHandle: {} }] })
    listObjects.resolves(undefined)
    return pollSqs().then(function (result) {
      return expect(result).to.equal(`file ${S3.FILE_TO_PROCESS} does not exist in bucket`)
    })
  })

  it('must not run when PS file has already been read', function () {
    receiveSqsMessage.resolves({ Messages: [{ ReceiptHandle: {} }] })
    listObjects.resolves([{ Key: '1.xlsx', LastModified: new Date() }])
    getHasBeenRead.withArgs(S3.FILE_TO_PROCESS).resolves(true)
    return pollSqs().then(function (result) {
      return expect(result).to.equal('File has been read')
    })
  })

  it('must run when PS file has not been read', function () {
    receiveSqsMessage.resolves({ Messages: [{ ReceiptHandle: {} }] })
    listObjects.resolves([{ Key: '1.xlsx', LastModified: new Date() }])
    getHasBeenRead.resolves(false)
    runEtl.resolves(true)
    return pollSqs().then(function (result) {
      return expect(result).to.be.true
    })
  })
})

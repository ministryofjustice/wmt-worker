const sinon = require('sinon')
const proxyquire = require('proxyquire')
const { expect } = require('chai')
const { READ_TAG_KEY } = require('../../../../etl-config')

describe('get has been read', function () {
  let getObjectTagging
  let getS3EtlClient
  let getHasBeenRead

  beforeEach(function () {
    getObjectTagging = sinon.stub()
    getS3EtlClient = sinon.stub()
    getHasBeenRead = proxyquire('../../../../app/wmt-etl/get-has-been-read', {
      './get-s3-etl-client': getS3EtlClient,
      '../services/aws/s3/get-object-tagging': getObjectTagging
    })
  })

  it('should return false when no tags are set', function () {
    getObjectTagging.resolves([])
    return getHasBeenRead('1').then(function (result) {
      return expect(result).to.be.false
    })
  })

  it('should return true when has been read tag is set', function () {
    getObjectTagging.resolves([{ Key: READ_TAG_KEY }])
    return getHasBeenRead('1').then(function (result) {
      return expect(result).to.be.true
    })
  })

  it('should return false when different tags are set', function () {
    getObjectTagging.resolves([{ Key: 'some other key' }])
    return getHasBeenRead('1').then(function (result) {
      return expect(result).to.be.false
    })
  })
})

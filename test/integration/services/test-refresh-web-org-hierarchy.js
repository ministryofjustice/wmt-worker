const expect = require('chai').expect
const assert = require('chai').assert
const proxyquire = require('proxyquire')

var refreshHierarchy

describe('app/services/refresh-web-org-hierarchy', function () {
  it('should log an error for an invalid IP', function (done) {
    refreshHierarchy = proxyquire('../../../app/services/refresh-web-org-hierarchy', {
      '../../config': { IP_ADDRESSES: 'https://integration:3000' }})
    refreshHierarchy()
    .then(function () {
      assert.fail()
    })
    .catch(function (err) {
      expect(err).to.not.be.undefined //eslint-disable-line
      done()
    })
  })
})

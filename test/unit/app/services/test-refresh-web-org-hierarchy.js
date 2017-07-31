const expect = require('chai').expect
const proxyquire = require('proxyquire')
const sinon = require('sinon')
require('sinon-bluebird')

var refreshHierarchy
var rp

describe('services/refresh-web-org-hierarchy', function () {
  before(function (done) {
    rp = sinon.stub()

    refreshHierarchy = proxyquire('../../../../app/services/refresh-web-org-hierarchy', {
      '../../config': { IP_ADDRESSES: 'https://localhost:3000,https://integration:3000' },
      'request-promise': rp})
    done()
  })

  it('should call a request-promise for each ip in the config var', function (done) {
    rp.resolves({})
    refreshHierarchy().then(function () {
      expect(rp.calledWith('https://localhost:3000/refresh')).to.be.true //eslint-disable-line
      expect(rp.calledWith('https://integration:3000/refresh')).to.be.true //eslint-disable-line
      done()
    })
  })
})

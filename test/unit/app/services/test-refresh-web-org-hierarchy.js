const expect = require('chai').expect
const proxyquire = require('proxyquire')
const sinon = require('sinon')

let refreshHierarchy
let createRequestPromise

describe('services/refresh-web-org-hierarchy', function () {
  before(function (done) {
    createRequestPromise = sinon.stub()

    refreshHierarchy = proxyquire('../../../../app/services/refresh-web-org-hierarchy', {
      '../../config': { IP_ADDRESSES: 'https://localhost:3000,https://integration:3000' },
      'request-promise': createRequestPromise
    })
    done()
  })

  it('should call a request-promise for each ip in the config var', function (done) {
    createRequestPromise.resolves({})
    refreshHierarchy().then(function () {
      expect(createRequestPromise.calledWith('https://localhost:3000/refresh')).to.be.true //eslint-disable-line
      expect(createRequestPromise.calledWith('https://integration:3000/refresh')).to.be.true //eslint-disable-line
      done()
    })
  })
})

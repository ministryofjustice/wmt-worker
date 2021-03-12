const expect = require('chai').expect
const proxyquire = require('proxyquire')
const sinon = require('sinon')

let refreshHierarchy
let fetch

describe('services/refresh-web-org-hierarchy', function () {
  before(function (done) {
    fetch = sinon.stub()

    refreshHierarchy = proxyquire('../../../../app/services/refresh-web-org-hierarchy', {
      '../../config': { IP_ADDRESSES: 'https://localhost:3000,https://integration:3000' },
      'node-fetch': fetch
    })
    done()
  })

  it('should call a request-promise for each ip in the config var', function (done) {
    fetch.resolves({})
    refreshHierarchy().then(function () {
      expect(fetch.calledWith('https://localhost:3000/refresh')).to.be.true //eslint-disable-line
      expect(fetch.calledWith('https://integration:3000/refresh')).to.be.true //eslint-disable-line
      done()
    })
  })
})

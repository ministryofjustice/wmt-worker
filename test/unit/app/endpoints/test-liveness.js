const request = require('supertest')
process.env.WMT_DB_SERVER = 'i-do-not-exist'
const proxyquire = require('proxyquire')

const server = proxyquire('../../../../app/create-server', { './services/log': { error: function () {} } })()

describe('liveness endpoint', function () {
  it('returns 500 when database is down', function () {
    return request(server).get('/liveness').expect(500)
  })
})

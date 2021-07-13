const request = require('supertest')
const server = require('../../../create-server')()

describe('liveness endpoint', function () {
  it('returns 200', function (done) {
    request(server).get('/liveness').expect(200, done)
  })

  it('other URL returns 404', function (done) {
    request(server).get('/anything-but-liveness').expect(404, done)
  })
})

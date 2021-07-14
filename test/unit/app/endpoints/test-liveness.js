const request = require('supertest')
process.env.WMT_DB_SERVER = 'i-do-not-exist'
const server = require('../../../../create-server')()

describe('liveness endpoint', function () {
  it('returns 500 when database is down', function (done) {
    request(server).get('/liveness').expect(500, done)
  })
})

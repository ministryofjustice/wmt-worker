var request = require('supertest')
var server = require('../../../create-server')()

describe('liveness endpoint', function(){
    it.only('returns 200', function(done){
        request(server).get('/liveness').expect(200,done)
    })
})
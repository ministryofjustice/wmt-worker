const expect = require('chai').expect
const knexConfig = require('../../../../knexfile').app
const knex = require('knex')(knexConfig)
const config = require('../../../../config')
const insertRegion = require('../../../../app/services/data/insert-region')
const Region = require('wmt-probation-rules').Region
const moment = require('moment')

describe('app/services/data/insert-region', function () {

  var regionId
  it('should insert a new region record', function (done) {
    var code = 'U'
    var region = new Region(undefined, code)
    insertRegion(region).then(function (id) {
      regionId = id
      return knex.table('region')
        .where({'id': regionId})
        .first()
        .then(function (result) {
          expect(result['id']).to.not.be.null // eslint-disable-line
          expect(result['code']).to.eq(code) // eslint-disable-line
          expect(result['description']).to.be.null // eslint-disable-line
          done()
        })
    })
  })

  after(function () {
    return knex('region').where('id', regionId).del()
  })
})

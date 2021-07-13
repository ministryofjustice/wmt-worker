const expect = require('chai').expect
const knex = require('../../../../knex').appSchema
const insertRegion = require('../../../../app/services/data/insert-region')
const Region = require('wmt-probation-rules').Region

describe('app/services/data/insert-region', function () {
  let regionId
  it('should insert a new region record', function (done) {
    const code = 'U'
    const originalRegionName = 'REGION NAME'
    const region = new Region(undefined, code, originalRegionName)
    insertRegion(region).then(function (id) {
      regionId = id
      return knex.table('region')
        .withSchema('app')
        .where({ id: regionId })
        .first()
        .then(function (result) {
          expect(result['id']).to.not.be.null // eslint-disable-line
          expect(result['code']).to.eq(code) // eslint-disable-line
          expect(result['description']).to.eq(originalRegionName) // eslint-disable-line
          done()
        })
    })
  })

  it('should update the name of an existing region', function (done) {
    const code = 'U'
    const regionName = 'TEST REGION NAME'
    const region = new Region(undefined, code, regionName)
    insertRegion(region).then(function (id) {
      regionId = id
      return knex.table('region')
        .withSchema('app')
        .where({ id: regionId })
        .first()
        .then(function (result) {
          expect(result['id']).to.eq(regionId[0]) // eslint-disable-line
          expect(result['code']).to.eq(code) // eslint-disable-line
          expect(result['description']).to.eq(regionName) // eslint-disable-line
          done()
        })
    })
  })

  after(function () {
    return knex('region').withSchema('app').where('id', regionId).del()
  })
})

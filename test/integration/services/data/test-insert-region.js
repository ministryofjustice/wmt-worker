const expect = require('chai').expect
const knex = require('../../../../knex').appSchema
const insertRegion = require('../../../../app/services/data/insert-region')
const Region = require('../../../../app/services/probation-rules').Region
const removeIntegrationTestData = require('../../../helpers/data/remove-integration-test-data')

describe('app/services/data/insert-region', function () {
  let regionId
  it('should insert a new region record', function () {
    const code = 'U'
    const originalRegionName = 'REGION NAME'
    const region = new Region(undefined, code, originalRegionName)
    return insertRegion(region).then(function (id) {
      regionId = id[0]
      return knex.table('region')
        .withSchema('app')
        .where({ id: regionId })
        .first()
        .then(function (result) {
          expect(result['id']).to.not.be.null // eslint-disable-line
          expect(result['code']).to.eq(code) // eslint-disable-line
          expect(result['description']).to.eq(originalRegionName) // eslint-disable-line
        })
    })
  })

  it('should update the name of an existing region', function () {
    const code = 'U'
    const regionName = 'TEST REGION NAME'
    const region = new Region(undefined, code, regionName)
    return insertRegion(region).then(function (id) {
      regionId = id[0]
      return knex.table('region')
        .withSchema('app')
        .where({ id: regionId })
        .first()
        .then(function (result) {
          expect(result['id']).to.eq(regionId) // eslint-disable-line
          expect(result['code']).to.eq(code) // eslint-disable-line
          expect(result['description']).to.eq(regionName) // eslint-disable-line
        })
    })
  })

  after(function () {
    return removeIntegrationTestData()
  })
})

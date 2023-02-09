const expect = require('chai').expect
const knex = require('../../../../knex').appSchema
const insertLdu = require('../../../../app/services/data/insert-ldu')
const Ldu = require('../../../../app/services/probation-rules').Ldu
const moment = require('moment')
const lduHelper = require('../../../helpers/data/app-ldu-helper')
const removeIntegrationTestData = require('../../../helpers/data/remove-integration-test-data')
const timeThreshold = require('../../../constants/time-threshold')

let inserts = []
let lduUniqueIdentifier

describe('app/services/data/insert-ldu', function () {
  before(function () {
    return lduHelper.addDependenciesForLdu()
      .then(function (insertedFields) {
        inserts = insertedFields
        return lduHelper.addDependenciesForLdu()
          .then(function (insertedFields2) {
            inserts = inserts.concat(insertedFields2)
          })
      })
  })

  it('should insert a new LDU record', function () {
    const code = 'U'
    const regionId = inserts.filter((item) => item.table === 'region')[0].id
    const originalLDUName = 'LDU NAME'
    const ldu = new Ldu(undefined, regionId, code, originalLDUName)
    return insertLdu(ldu).then(function (lduId) {
      lduUniqueIdentifier = lduId[0]
      return knex.table('ldu')
        .withSchema('app')
        .where({ id: lduUniqueIdentifier })
        .first()
        .then(function (result) {
          expect(result['id']).to.not.be.null // eslint-disable-line
          expect(result['code']).to.eq(code) // eslint-disable-line
          expect(result['description']).to.eq(originalLDUName) // eslint-disable-line
          expect(moment().diff(result['effective_from'], 'seconds')).to.be.lt(timeThreshold.INSERT) // eslint-disable-line
          inserts.push({ table: 'ldu', id: lduId[0] })
        })
    })
  })

  it('should update the name of an existing LDU record', function () {
    const code = 'U'
    const regionId = inserts.filter((item) => item.table === 'region')[0].id
    const newLDUName = 'TEST LDU NAME'
    const ldu = new Ldu(undefined, regionId, code, newLDUName)
    return insertLdu(ldu).then(function (lduId) {
      return knex.table('ldu')
        .withSchema('app')
        .where({ id: lduId[0] })
        .first()
        .then(function (result) {
          expect(result['id']).to.eq(lduUniqueIdentifier) // eslint-disable-line
          expect(result['code']).to.eq(code) // eslint-disable-line
          expect(result['description']).to.eq(newLDUName) // eslint-disable-line
        })
    })
  })

  it('should update the Region ID of an existing LDU record', function () {
    const code = 'U'
    const regionId = inserts.filter((item) => item.table === 'region')[1].id
    const newLDUName = 'TEST LDU NAME'
    const ldu = new Ldu(undefined, regionId, code, newLDUName)
    return insertLdu(ldu).then(function (lduId) {
      return knex.table('ldu')
        .withSchema('app')
        .where({ id: lduId[0] })
        .first()
        .then(function (result) {
          expect(result['id']).to.eq(lduUniqueIdentifier) // eslint-disable-line
          expect(result.region_id).to.eq(regionId)
          expect(result['code']).to.eq(code) // eslint-disable-line
          expect(result['description']).to.eq(newLDUName) // eslint-disable-line
        })
    })
  })

  after(function () {
    return removeIntegrationTestData()
  })
})

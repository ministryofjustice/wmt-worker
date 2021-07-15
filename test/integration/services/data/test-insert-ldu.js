const expect = require('chai').expect
const knex = require('../../../../knex').appSchema
const insertLdu = require('../../../../app/services/data/insert-ldu')
const Ldu = require('wmt-probation-rules').Ldu
const moment = require('moment')
const lduHelper = require('../../../helpers/data/app-ldu-helper')
const timeThreshold = require('../../../constants/time-threshold')

let inserts = []
let lduUniqueIdentifier

describe('app/services/data/insert-ldu', function () {
  before(function (done) {
    lduHelper.addDependenciesForLdu()
      .then(function (insertedFields) {
        inserts = insertedFields
        lduHelper.addDependenciesForLdu()
          .then(function (insertedFields2) {
            inserts = inserts.concat(insertedFields2)
            done()
          })
      })
  })

  it('should insert a new LDU record', function (done) {
    const code = 'U'
    const regionId = inserts.filter((item) => item.table === 'region')[0].id
    const originalLDUName = 'LDU NAME'
    const ldu = new Ldu(undefined, regionId, code, originalLDUName)
    insertLdu(ldu).then(function (lduId) {
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
          done()
        })
        .catch(function (error) {
          done(error)
        })
    }).catch(function (error) {
      done(error)
    })
  })

  it('should update the name of an existing LDU record', function (done) {
    const code = 'U'
    const regionId = inserts.filter((item) => item.table === 'region')[0].id
    const newLDUName = 'TEST LDU NAME'
    const ldu = new Ldu(undefined, regionId, code, newLDUName)
    insertLdu(ldu).then(function (lduId) {
      return knex.table('ldu')
        .withSchema('app')
        .where({ id: lduId[0] })
        .first()
        .then(function (result) {
          expect(result['id']).to.eq(lduUniqueIdentifier) // eslint-disable-line
          expect(result['code']).to.eq(code) // eslint-disable-line
          expect(result['description']).to.eq(newLDUName) // eslint-disable-line
          done()
        })
    })
  })

  it('should update the Region ID of an existing LDU record', function (done) {
    const code = 'U'
    const regionId = inserts.filter((item) => item.table === 'region')[1].id
    const newLDUName = 'TEST LDU NAME'
    const ldu = new Ldu(undefined, regionId, code, newLDUName)
    insertLdu(ldu).then(function (lduId) {
      return knex.table('ldu')
        .withSchema('app')
        .where({ id: lduId[0] })
        .first()
        .then(function (result) {
          expect(result['id']).to.eq(lduUniqueIdentifier) // eslint-disable-line
          expect(result.region_id).to.eq(regionId)
          expect(result['code']).to.eq(code) // eslint-disable-line
          expect(result['description']).to.eq(newLDUName) // eslint-disable-line
          done()
        })
    })
  })

  after(function (done) {
    lduHelper.removeDependenciesForLdu(inserts)
      .then(() => done())
  })
})

const expect = require('chai').expect
const knex = require('../../../../knex').appSchema
const insertLdu = require('../../../../app/services/data/insert-ldu')
const Ldu = require('wmt-probation-rules').Ldu
const moment = require('moment')
const lduHelper = require('../../../helpers/data/app-ldu-helper')
const timeThreshold = require('../../../constants/time-threshold')

var inserts = []
var lduUniqueIdentifier

describe('app/services/data/insert-ldu', function () {
  before(function (done) {
    lduHelper.addDependenciesForLdu()
      .then(function (insertedFields) {
        inserts = insertedFields
        done()
      })
  })

  it('should insert a new ldu record', function (done) {
    var code = 'U'
    var regionId = inserts.filter((item) => item.table === 'region')[0].id
    var originalLDUName = 'LDU NAME'
    var ldu = new Ldu(undefined, regionId, code, originalLDUName)
    insertLdu(ldu).then(function (lduId) {
      lduUniqueIdentifier = lduId[0]
      return knex.table('ldu')
        .where({'id': lduId})
        .first()
        .then(function (result) {
          expect(result['id']).to.not.be.null // eslint-disable-line
          expect(result['code']).to.eq(code) // eslint-disable-line
          expect(result['description']).to.eq(originalLDUName) // eslint-disable-line
          expect(moment().diff(result['effective_from'], 'seconds')).to.be.lt(timeThreshold.INSERT) // eslint-disable-line
          inserts.push({table: 'ldu', id: lduId})
          done()
        })
    })
  })

  it('should update an existing ldu record', function (done) {
    var code = 'U'
    var regionId = inserts.filter((item) => item.table === 'region')[0].id
    var newLDUName = 'TEST LDU NAME'
    var ldu = new Ldu(undefined, regionId, code, newLDUName)
    insertLdu(ldu).then(function (lduId) {
      return knex.table('ldu')
        .where({'id': lduId})
        .first()
        .then(function (result) {
          expect(result['id']).to.eq(lduUniqueIdentifier) // eslint-disable-line
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

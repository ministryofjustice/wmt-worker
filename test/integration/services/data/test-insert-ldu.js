const expect = require('chai').expect
const knexConfig = require('../../../../knexfile').app
const knex = require('knex')(knexConfig)
const insertLdu = require('../../../../app/services/data/insert-ldu')
const Ldu = require('wmt-probation-rules').Ldu
const moment = require('moment')
const lduHelper = require('../../../helpers/data/app-ldu-helper')

var inserts = []

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
    var ldu = new Ldu(undefined, regionId, code)
    insertLdu(ldu).then(function (lduId) {
      return knex.table('ldu')
        .where({'id': lduId})
        .first()
        .then(function (result) {
          expect(result['id']).to.not.be.null // eslint-disable-line
          expect(result['code']).to.eq(code) // eslint-disable-line
          expect(result['description']).to.be.null // eslint-disable-line
          expect(moment().diff(result['effective_from'], 'seconds')).to.be.lt(10) // eslint-disable-line
          inserts.push({table: 'ldu', id: lduId})
          done()
        })
    })
  })

  after(function (done) {
    lduHelper.removeDependenciesForLdu(inserts)
    .then(() => done())
  })
})

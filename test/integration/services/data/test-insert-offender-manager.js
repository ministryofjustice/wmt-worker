const expect = require('chai').expect
const knexConfig = require('../../../../knexfile').app
const knex = require('knex')(knexConfig)
const insertOffenderManager = require('../../../../app/services/data/insert-offender-manager')
const OffenderManager = require('wmt-probation-rules').OffenderManager
const moment = require('moment')

describe('app/services/data/insert-offender-manager', function () {
  var offenderManagerId

  var typeId
  before(function (done) {
    knex('offender_manager_type').returning('id').insert({description: 'test'})
      .then(function (id) {
        typeId = id[0]
        done()
      })
  })

  it('should insert a new offender manager record', function (done) {
    var key = '104FD'
    var offenderManager = new OffenderManager(undefined, key, undefined, undefined, typeId, undefined)

    insertOffenderManager(offenderManager).then(function (id) {
      offenderManagerId = id
      return knex.table('offender_manager')
        .where({'id': id})
        .first()
        .then(function (result) {
          expect(result['id']).to.not.be.null // eslint-disable-line
          expect(result['key']).to.eq(key) // eslint-disable-line
          expect(result['forename']).to.be.null // eslint-disable-line
          expect(result['surname']).to.be.null // eslint-disable-line
          expect(result['type_id']).to.eq(typeId) // eslint-disable-line
          expect(result['grade_code']).to.be.null // eslint-disable-line
          expect(moment().diff(result['effective_from'], 'seconds')).to.be.lt(10) // eslint-disable-line
          expect(result['effective_to']).to.be.null // eslint-disable-line
          done()
        })
    })
  })

  after(function () {
    return knex('offender_manager').where('id', offenderManagerId).del()
  })
})

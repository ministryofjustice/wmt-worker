const expect = require('chai').expect
const knexConfig = require('../../../../knexfile').development
const knex = require('knex')(knexConfig)
const config = require('../../../../config')
const insertOffenderManager = require('../../../../app/services/data/insert-offender-manager')
const OffenderManager = require('wmt-probation-rules').OffenderManager
const tableName = `${config.DB_APP_SCHEMA}.offender_manager`

describe('app/services/data/insert-offender-manager', function () {
  it('should insert a new offender manager record', function () {
    insertOffenderManager(new OffenderManager()).then(function (offenderManagerId) {
      return knex.table(tableName)
        .where({'id': offenderManagerId})
        .first()
        .then(function (result) {
          expect(result['id']).to.not.be.null // eslint-disable-line
          expect(result['key']).to.be.null // eslint-disable-line
          expect(result['forename']).to.be.null // eslint-disable-line
          expect(result['surname']).to.be.null // eslint-disable-line
          expect(result['type_id']).to.be.null // eslint-disable-line
          expect(result['grade_code']).to.be.null // eslint-disable-line
          expect(result['effective_from']).to.be.null // eslint-disable-line
          expect(result['effective_to']).to.be.null // eslint-disable-line
        })
    })
  })

  after(function () {
    return knex(tableName).del()
  })
})

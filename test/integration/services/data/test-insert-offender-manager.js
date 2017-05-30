const expect = require('chai').expect
const knexConfig = require('../../../../knexfile').development
const knex = require('knex')(knexConfig)
const config = require('../../../../config')
const insertWorkloadOwner = require('../../../../app/services/data/insert-offender-manager')

describe('app/services/data/insert-offender-manager', function () {
  const tableName = `${config.DB_APP_SCHEMA}.offender_manager`
  it('should insert a new offender manager record', function () {
    insertWorkloadOwner().then(function (offenderManagerId) {
      return knex.table(tableName)
        .where({'id': offenderManagerId})
        .first()
        .then(function (result) {
          expect(result['id']).to.not.be.null // eslint-disable-line
          expect(result['om_key']).to.be.null // eslint-disable-line
          expect(result['om_forename']).to.be.null // eslint-disable-line
          expect(result['om_surname']).to.be.null // eslint-disable-line
          expect(result['om_type_id']).to.be.null // eslint-disable-line
          expect(result['om_grade_code']).to.be.null // eslint-disable-line
          expect(result['effective_from']).to.be.null // eslint-disable-line
          expect(result['effective_to']).to.be.null // eslint-disable-line
        })
    })
  })

  after(function () {
    return knex(tableName).del()
  })
})
